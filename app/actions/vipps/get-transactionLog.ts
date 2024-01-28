'use server';

import hasAccess, { isLoggedIn } from "@/app/api/middleware/auth";
import authOptions from "@/app/auth/authOptions";
import { adminRoles } from "@/app/enums/role";
import { OrderStatus } from "@/app/utils/enums";
import { getServerSession } from "next-auth";
import { getVippsToken, getVippsTokenFromDB, isValidVippsToken, setVippsHeaders, updateVippsTokenInDB } from "./utils";


export type TransactionLog = {
    amount: number;
    operation: OrderStatus;
    opreationSuccess: boolean;
    timeStamp: string;
    transactionId: string;
    transactionText: string;
    requestId?: string;
};

export const getTransactionLog = async (orderId: string): Promise<TransactionLog[]> => {
    const session = await getServerSession(authOptions);

    if (!isLoggedIn(session)) throw new Error('Du er ikke innlogget.');

    if (!hasAccess(session!.role, adminRoles)) throw new Error('Du har ikke tilgang til å hente transaksjonsloggen.');

    try {
        // let vippsToken = await getVippsTokenFromDB();
        // if (!isValidVippsToken(vippsToken.expiresAt)) {
        //     vippsToken = await getVippsToken();
        //     await updateVippsTokenInDB({
        //         accessToken: vippsToken.accessToken,
        //         expiresAt: vippsToken.expiresAt
        //     });
        // }

        const vippsToken = await getVippsToken();

        const headers = setVippsHeaders(vippsToken.accessToken);

        const orderUrl = process.env.VIPPS_ORDER_URL + orderId + '/details';

        const res = await fetch(orderUrl, {
            method: 'GET',
            headers: headers
        });

        const data = await res.json();

        const transactionLog: TransactionLog[] = data.transactionLogHistory;

        return transactionLog;
    } catch (e) {
        throw Error('Det skjedde en feil med henting av transaksjonsloggen.')
    }
};