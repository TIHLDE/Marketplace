import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import hasAccess, { isLoggedIn } from "../../middleware/auth";
import { adminRoles } from "@/app/enums/role";
import { getVippsPaymentTransactionLog, getVippsToken, isValidVippsToken } from "../utils";
import { OrderStatus } from "@/app/utils/enums";


export type TransactionLog = {
    amount: number;
    operation: OrderStatus;
    opreationSuccess: boolean;
    timeStamp: string;
    transactionId: string;
    transactionText: string;
    requestId?: string;
};

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
    const session = await getServerSession(authOptions);

    if (!isLoggedIn(session)) {
        return NextResponse.json({ message: "Du er ikke innlogget." }, { status: 401 });
    }

    if (!hasAccess(session!.role, adminRoles)) {
        return NextResponse.json({ message: "Du har ikke tilgang til å hente transaksjonsloggen." }, { status: 403 });
    }

    const id = params.id;

    if (!id) {
        return NextResponse.json({ message: "Ingen ordre id." }, { status: 400 });
    }

    try {
        const { accessToken, expiresAt } = await getVippsToken();

        if (!isValidVippsToken(expiresAt)) {
            return NextResponse.json({ message: 'Dette skjedde en feil med opprettelsen av vippsbetaling' }, { status: 500 });
        }

        const transactionLog: TransactionLog[] = await getVippsPaymentTransactionLog(id, accessToken);

        return NextResponse.json(transactionLog, { status: 200 });
    } catch (e) {
        return NextResponse.json({ message: "Noe gikk galt med henting av transaksjonsloggen." }, { status: 500 });
    }
};