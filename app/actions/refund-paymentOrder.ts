'use server';

import { ZodError } from "zod";
import { PaymentOrderState } from "./update-paymentOrder";
import parsePaymentOrder from "./utils/parse-paymentOrder";
import { paymentOrderSchema } from "../validationSchemas";
import { getVippsToken, isValidVippsToken, refundVippsPayment } from "../api/vipps/utils";
import { getPaymentOrderAmount, updatePaymentOrderAccessToken, updatePaymentOrderStatus } from "../db/paymentOrder";
import { OrderStatus } from "../utils/enums";
import { revalidatePath } from "next/cache";


const refundPaymentOrder = async (
    id: string,
    prevState: PaymentOrderState,
    formData: FormData
): Promise<PaymentOrderState> => {
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

        const orderAmount = await getPaymentOrderAmount(validation.id);

        await refundVippsPayment(validation.id, accessToken, orderAmount);

        await updatePaymentOrderStatus(validation.id, OrderStatus.REFUND);

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
};


export default refundPaymentOrder;