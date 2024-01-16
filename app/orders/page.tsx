import Link from "next/link";


const OrdersPage = () => {
    return (
        <div className='max-w-6xl w-full py-12 mx-auto px-32'>
            <div className='space-y-4 pb-20'>
                <h1 className='text-4xl font-bold'>
                    Mine betalingsordre
                </h1>
                <p className='max-w-xl w-full'>
                    Her finner du en oversikt over dine betalingsordre for produkter fra TIHLDE Marketplace og arrangementer.
                </p>
            </div>

            <div className='flex items-center justify-between space-x-12'>
                <OrderNavigation 
                    title='Produkter'
                    description='Her finner du en oversikt over dine betalingsordre for produkter fra TIHLDE Marketplace.'
                    href='/orders/products'
                />

                <OrderNavigation 
                    title='Arrangementer'
                    description='Her finner du en oversikt over dine betalingsordre for arrangementer fra TIHLDE.'
                    href='/orders/events'
                />
            </div>
        </div>
    );
};

interface OrderNavigationProps {
    title: string;
    description: string;
    href: string;
};

const OrderNavigation = ({ title, description, href }: OrderNavigationProps) => {
    return (
        <Link 
            className='py-3 px-6 rounded-md border border-gray-300 max-w-lg w-full hover:border-tihlde-700'
            href={href}
        >
            <h1 className='text-lg font-semibold pb-2'>
                { title }
            </h1>
            <p>
                { description }
            </p>
        </Link>
    );
};


export default OrdersPage;