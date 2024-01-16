import { PaymentOrder } from "@prisma/client";


export type PaymentOrderForm = Pick<
    PaymentOrder,
    'id'
>;

const parsePaymentOrder = (id: string): PaymentOrderForm => {
    return {
        id: id
    }
};


export default parsePaymentOrder;