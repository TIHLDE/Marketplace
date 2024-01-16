'use client';

import { useContext, useEffect, useState } from "react";
import { CartContext, CartContextType } from "../providers";
import { emptyLocalCart } from "../functions/cart";
import { PaymentOrderWithProductsWithFullInfo } from "../db/paymentOrder";
import ProductListItem from "../components/product/ListItem";
import { ProductInfo } from "../db/product";


interface SuccessOrderProps {
    order: PaymentOrderWithProductsWithFullInfo;
    searchParams: { [key: string]: string | string[] | undefined };
};

const SuccessOrder = ({ order, searchParams }: SuccessOrderProps) => {
    const { setCart } = useContext(CartContext) as CartContextType;
    const [products, setProducts] = useState<(ProductInfo & { count: number })[]>([]);

    useEffect(() => {
        sortProducts(order.products.map(product => product.product));
        if (!searchParams?.vipps) return;
        setCart([]);
        emptyLocalCart();
    }, []);


    const sortProducts = (products: ProductInfo[]) => {
        const counts: { [key: string]: number } = {};

        products.forEach(product => {
            counts[product.id] = counts[product.id] ? counts[product.id] + 1 : 1;
        }); 

        const uniqueProducts = Object.keys(counts).map(product => {
            return {
                ...products.find(p => p.id === product),
                count: counts[product]
            };
        });

    };

    return (
        <div className='py-6 px-4'>
            <div className='w-24 py-2 rounded-lg text-center bg-white border border-caribbean-700 mb-28'>
                <p className='text-caribbean-700 text-xs font-semibold'>
                    Betalt
                </p>
            </div>

            <div className='pb-12'>
                <h1 className='text-3xl font-bold pb-2'>
                    Betalingen er gjennomført
                </h1>
                <p className='pb-6'>
                    Kvittering er sendt til din e-postadresse.
                </p>
            </div>

            {/* { order.products.map((product, index) => (
                <ProductListItem 
                    key={index}
                    product={product.product} 
                    border={index !== order.products.length - 1}
                />
            )) } */}
        </div>
    );
};


export default SuccessOrder;