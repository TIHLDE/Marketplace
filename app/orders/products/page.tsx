import { PaymentOrderWithProducts, getPaymentOrders } from "@/app/db/paymentOrder";
import OrderStatus from "./_components/OrderStatus";
import Link from "next/link";


const OrdersProductsPage = async () => {
    const paymentOrders = await getPaymentOrders();

    return (
        <div className='max-w-6xl w-full py-12 mx-auto px-32 min-h-screen'>
            <div className='space-y-4 pb-20'>
                <h1 className='text-4xl font-bold'>
                    Mine betalingsordre
                </h1>
                <p className='max-w-xl w-full'>
                    Her finner du en oversikt over dine betalingsordre for produkter fra TIHLDE Marketplace.
                </p>
            </div>

            <div className='grid grid-cols-2 gap-8'>
                {paymentOrders.map((order, index) => (
                    <Order key={index} order={order} />
                ))}
            </div>
        </div>
    );
};

interface OrderProps {
    order: PaymentOrderWithProducts;
};

const Order = ({ order }: OrderProps) => {
    return (
        <Link 
            className='px-4 py-2 rounded-md border border-gray-300 hover:border-gray-900'
            href={`/orders/${order.id}`}
        >
            <div className='flex items-center justify-between pb-4'>
                <OrderStatus status={order.status} />
                <p className='text-sm text-gray-500'>
                    {order.createdAt.toLocaleString('nb-NO')}
                </p>
            </div>
            <h1 className='text-sm pb-4'>
                Antall produkter: {order.products.length}
            </h1>
            <div className='text-xs'>
                <span className='font-semibold'>ordre_id:</span> {order.id}
            </div>
        </Link>
    );
};


export default OrdersProductsPage;