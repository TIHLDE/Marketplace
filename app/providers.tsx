'use client';

import { createContext, useEffect, useState } from "react";


export interface CartProduct {
    productId: string;
    variantId: string;
    name: string;
    price: number;
    size: string;
    category: string;
    count: number;
    image?: string;
    discount?: number;
};

export type CartContextType = {
    cart: CartProduct[];
    setCart: (products: CartProduct[]) => void;
}

export const CartContext = createContext<CartContextType | null>(null);

const Providers = ({ children }: React.PropsWithChildren) => {
    const [cart, setCart] = useState<CartProduct[]>([]);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            
        if (cart) setCart(cart);
    }, []);

    return (
        <CartContext.Provider value={{ cart, setCart }}>
            { children }
        </CartContext.Provider>
    );
};


export default Providers;