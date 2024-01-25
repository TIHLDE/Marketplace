'use server';

import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";
import { TransactionLog, getTransactionLog } from "./get-transactionLog";
import { TIHLDE_DEV_API_URL } from "@/app/values";


export const updatePaymentOrder = async (orderId: string) => {
    try {
        const transactionLog: TransactionLog[] = await getTransactionLog(orderId);

        const newStatus = transactionLog[0].operation;

        const session = await getServerSession(authOptions);
        
        const updateUrl = `${TIHLDE_DEV_API_URL}/payments/${orderId}/`;
        const data = {
            status: newStatus
        }

        const res = await fetch(updateUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-csrf-token': session!.tihldeUserToken
            },
            body: JSON.stringify(data)
        });

        const updatedOrder = await res.json();

        return updatedOrder;
    } catch (e) {
        throw Error('Det skjedde en feil med oppdatering av ordren.')
    }
};