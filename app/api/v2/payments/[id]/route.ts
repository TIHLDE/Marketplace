import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (request: NextRequest) => {
    const body = await request.json();

    const merchantSerialNumber = body.merchantSerialNumber;
    const orderId = body.orderId;
    const transactionInfo = body.transactionInfo;
    const status = transactionInfo.status;

    if (merchantSerialNumber !== process.env.VIPPS_MERCHANT_SERIAL_NUMBER) {
        return NextResponse.json({ message: 'Feil MSN.' }, { status: 401 });
    }

    const order = await prisma.paymentOrder.findUnique({
        where: {
            id: orderId
        }
    });

    if (!order) {
        return NextResponse.json({ message: 'Ordre ikke funnet.' }, { status: 404 });
    }

    await prisma.paymentOrder.update({
        data: {
            status: status
        },
        where: {
            id: orderId
        }
    });

    return NextResponse.json({ message: 'Ordre er oppdatert.' }, { status: 200 });
};
