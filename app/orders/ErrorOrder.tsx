'use client';

import { useContext, useState } from "react";
import { CartContext, CartContextType } from "../providers";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import Link from "next/link";


const ErrorOrder = () => {
    const { cart } = useContext(CartContext) as CartContextType;
    const [isLoading, setLoading] = useState(false);

    const initVippsPayment = async () => {
        setLoading(true);

        try {
            const response = await axios.post('/api/vipps', {
                paymentPrice: getTotalPrice(),
                products: cart.map(product => ({
                    name: product.name,
                    count: product.count,
                    price: product.discount ? product.price - (product.price * (product.discount / 100)) : product.price
                }))
            });

            const orderURL = await response.data.url;

            if (!orderURL) throw new Error('Kunne ikke hente betalingslenke');

            window.location.replace(orderURL);
        } catch (error) {
            toast.error((error as AxiosError<any>).response?.data?.message || 'Noe gikk galt');
        } finally {
            setLoading(false);
        }
    };

    const getTotalPrice = () => {
        return cart.reduce((acc, curr) => {
            if (!curr.discount) return acc + curr.price * curr.count;
            return acc + (curr.price - (curr.price * (curr.discount / 100))) * curr.count;
        }, 0);
    };

    return (
        <div className='py-6 px-4 space-y-28'>
            <div className='w-24 py-2 rounded-lg text-center bg-white border border-coral-red-700'>
                <p className='text-coral-red-700 text-xs font-semibold'>
                    Ikke betalt
                </p>
            </div>

            <div className='pb-8'>
                <h1 className='text-3xl font-bold pb-2'>
                    Betalingen ble ikke gjennomført
                </h1>
                <p className='pb-6'>
                    Det kan være flere grunner til dette. Du kan ha avbrutt betalingen, eller det kan ha oppstått en feil. {cart.length ? 'Trykk på knappen under for å prøve igjen.' : 'Det er ingen produkter tilegnet denne orderen. Trykk på knappen under for å gå tilbake til produktkatalog.'}
                </p>
                <p className='text-sm'>
                    Hvis du mener dette er en feil, ta kontakt med oss på <span>hs@tihlde.org</span>
                </p>
            </div>

            {cart.map((product, index) => (
                <div>
                    { product.name }
                </div>
            ))}

            <div className='max-w-sm w-full mx-auto'>
                { cart.length
                    ? (
                        <button
                            disabled={isLoading}
                            onClick={initVippsPayment}
                            className='w-full text-center bg-vipps-default text-white py-3 rounded-lg font-semibold'
                        >
                            Betal med Vipps
                        </button>
                    ) 
                    : (
                        <Link
                            href='/product'
                            className='w-full text-center bg-tihlde-600 text-white py-3 rounded-lg font-semibold'
                        >
                            Gå til produktkatalog
                        </Link>
                    )
                }
            </div>
        </div>
    );
};


export default ErrorOrder;