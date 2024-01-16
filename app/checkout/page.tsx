'use client';

import { useContext, useState } from "react";
import { CartContext, CartContextType, CartProduct } from "../providers";
import { Cross2Icon } from "@radix-ui/react-icons";
import { removeFromCart, removeFromLocalCart } from "../functions/cart";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import Link from "next/link";


const CheckoutPage = () => {
    const { cart, setCart } = useContext(CartContext) as CartContextType;
    const [isLoading, setLoading] = useState(false);

    if (!cart.length) {
        return (
            <div className='max-w-xl w-full mx-auto h-96 flex items-center justify-center'>
                <div className='flex items-center justify-center flex-col mb-20'>
                    <div className='space-y-4 pb-12'>
                        <h1 className='text-2xl font-semibold'>
                            Ingenting å betale
                        </h1>
                        <p className='text-gray-500 text-center'>
                            Handlekurven din er tom
                        </p>
                    </div>

                    <Link
                        href='/products'
                        className='px-12 rounded-md bg-gray-900 text-white py-2'
                    >
                        Se produkter
                    </Link>
                </div>
            </div>
        );
    }

    const remove = (product: CartProduct) => {
        const newCart = removeFromCart(product, cart);
        setCart(newCart);
        removeFromLocalCart(product);

        toast.success('Produkt fjernet fra handlekurv');
    };

    const initVippsPayment = async () => {
        setLoading(true);

        try {
            const response = await axios.post('/api/vipps', {
                paymentPrice: getTotalPrice(),
                products: cart.map(product => ({
                    variantId: product.variantId,
                    name: product.name,
                    count: product.count,
                    price: product.discount ? product.price - (product.price * (product.discount / 100)) : product.price
                }))
            });

            const orderURL = await response.data.url;

            if (!orderURL) throw new Error('Kunne ikke hente betalingslenke');

            window.location.replace(orderURL);
        } catch (error) {
            toast.error((error as AxiosError<any>).response?.data?.message);
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
        <div className='max-w-xl w-full mx-auto py-12'>
            <div className='pb-4 border-b border-gray-300 space-y-2'>
                {cart.map((product, index) => (
                    <CheckoutItem 
                        key={index}
                        product={product}
                        removeFromCart={remove} 
                    />
                ))}
            </div>
            <div className='flex items-center justify-between mt-2 pb-6'>
                <h1 className='font-semibold'>
                    Totalpris:
                </h1>
                <h1 className='font-semibold'>
                    { getTotalPrice() } NOK
                </h1>
            </div>
            <div>
                <button
                    onClick={initVippsPayment}
                    disabled={isLoading}
                    className={`${isLoading ? 'bg-vipps-bg' : 'bg-vipps-default hover:bg-vipps-hover'} w-full text-center py-3 rounded-lg flex justify-center`}
                >
                    <h1 className={`${isLoading ? 'text-vipps-default' : 'text-white'} text-lg font-semibold`}>
                        { isLoading ? 'Henter betalingsordre...' : 'Betal med Vipps' }
                    </h1>
                </button>
            </div>
        </div>
    );
};

    
const CheckoutItem = ({ product, removeFromCart }: { product: CartProduct, removeFromCart: (product: CartProduct) => void }) => {
    return (
        <div className='flex items-center justify-between'>
            <div className='flex items-center'>
                <Image image={product.image} />

                <div className='ml-4'>
                    <p className='font-semibold'>
                        { product.name }
                    </p>

                    <ProductPrice {...product} />

                    <p className='text-sm'>
                        { product.count } x { product.size }
                    </p>
                </div>
            </div>

            <button
                onClick={() => removeFromCart(product)}
                className='text-gray-500 hover:text-gray-600'
            >
                <Cross2Icon />
            </button>
        </div>
    );
};

const ProductPrice = ({
    price,
    discount
}: Pick<CartProduct, 'price' | 'discount'>) => {
    if (!discount) return (
        <h1 className='text-sm text-gray-500'>
            { price } NOK
        </h1>
    );

    return (
        <h1 className='text-sm text-gray-500'>
            { price - (price * (discount / 100)) } NOK
        </h1>
    );
};

const Image = ({ image }: { image: string | undefined }) => {
    if (!image) {
        return (
            <div
                className='w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center'
            >
                <img 
                    src='/default-image.png'
                    className='w-4'
                />
            </div>
        );
    }

    return (
        <img
            src={image}
            className='w-16 h-16 object-cover rounded-lg'
        />
    );
};


export default CheckoutPage;