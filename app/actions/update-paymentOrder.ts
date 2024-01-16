'use server';

import { ZodError } from "zod";
import parsePaymentOrder, { PaymentOrderForm } from "./utils/parse-paymentOrder";
import { paymentOrderSchema } from "../validationSchemas";
import { getPaymentOrderAccessToken, updatePaymentOrderAccessToken, updatePaymentOrderStatus } from "../db/paymentOrder";
import { getVippsPaymentStatus, getVippsPaymentTransactionLog, getVippsToken, isValidVippsToken } from "../api/vipps/utils";
import { OrderStatus } from "../utils/enums";
import { revalidatePath } from "next/cache";


export type PaymentOrderState = {
    status: string,
    errors: Record<keyof PaymentOrderForm, string> | string | undefined,
    form: PaymentOrderForm

};

const updatePaymentOrder = async (
    id: string,
    prevState: PaymentOrderState,
    formData: FormData
) : Promise<PaymentOrderState> => {
    const paymentOrder = parsePaymentOrder(id);

    try {
        const validation = paymentOrderSchema.parse(paymentOrder);

        const { accessToken, expiresAt } = await getVippsToken();

        if (!isValidVippsToken(expiresAt)) {
            return {
                status: 'error',
                errors: 'Vipps token er ugyldig',
                form: paymentOrder
            };
        };
        
        await updatePaymentOrderAccessToken(validation.id, accessToken, expiresAt);

        const vippsStatus = await getVippsPaymentStatus(validation.id, accessToken);

        await updatePaymentOrderStatus(validation.id, vippsStatus as OrderStatus);

        revalidatePath(`/admin/stats/products/transactions/${validation.id}`);

        return {
            status: 'success',
            errors: undefined,
            form: {
                id: id
            }
        }

    } catch (e) {
        const error = e as Error;

        if (error instanceof ZodError) {
            const errorMap = error.flatten().fieldErrors;
            return {
                status: 'field-error',
                errors: {
                    id: errorMap.id?.[0] ?? '',
                },
                form: paymentOrder
            }
        }

        return {
            status: 'error',
            errors: error.message,
            form: paymentOrder
        }
    }
}


export default updatePaymentOrder;