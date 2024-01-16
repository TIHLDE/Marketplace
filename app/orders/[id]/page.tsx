import { getUpdatedPaymentOrder } from "@/app/db/paymentOrder";
import { OrderStatus } from "@/app/utils/enums";
import { notFound } from "next/navigation";
import ErrorOrder from "../ErrorOrder";
import SuccessOrder from "../SuccessOrder";


interface OrderPageProps {
    params: { id: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

const OrderPage = async ({ params, searchParams }: OrderPageProps) => {
    const order = await getUpdatedPaymentOrder(params.id, Boolean(searchParams.vipps) || false);
    
    if (!order) notFound();

    return (
        <div className='flex space-x-12'>
            <div className='max-w-2xl w-full min-h-screen bg-gradient-to-br from-[#cf91e1] to-tihlde-950 flex items-center justify-center'>
                <h1 className='text-white text-7xl font-bold text-center'>
                    TIHLDE MARKETPLACE
                </h1>
            </div>

            { 
                order.status !== OrderStatus.SALE
                    ? <ErrorOrder />
                    : <SuccessOrder order={order} searchParams={searchParams} />
            }
        </div>
    );
};


export default OrderPage;