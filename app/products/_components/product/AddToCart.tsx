'use client';

import { ProductInfo } from "@/app/db/product";
import { addToCart, addToLocalCart } from "@/app/functions/cart";
import { CartContext, CartContextType, CartProduct } from "@/app/providers";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import SizeSelector from "./SizeSelector";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AddToCart = ({ product }: { product: ProductInfo }) => {
    const { data: session } = useSession();
    const router = useRouter();
    const { cart, setCart } = useContext(CartContext) as CartContextType;

    const [size, setSize] = useState<string | null>(null);

    const add = () => {
        if (!session) return router.push('/api/auth/signin'); 

        if (!size) return toast.error('Du må velge størrelse');

        try {
            const cartProduct: CartProduct = {
                productId: product.id,
                variantId: product.sizes.find(s => s.productId === product.id && s.sizeId === size)!.id,
                name: product.name,
                price: product.price,
                category: product.category.name,
                size: product.sizes.find(s => s.productId === product.id && s.sizeId === size)!.size.name,
                count: 1,
                image: product.images?.[0]?.image?.url,
                discount: product.discount?.discount_percent
            }
            const newCart = addToCart(cartProduct, cart);
            setCart(newCart);
            addToLocalCart(cartProduct);
            toast.success('Produkt lagt i handlekurv');
        } catch (e) {
            toast.error('Kunne ikke legge produkt i handlekurv');
        }
    }

    return (
        <div className='space-y-4'>
            <SizeSelector 
                sizes={product.sizes} 
                currentSize={size}
                setSize={setSize}
            />
            <button
                onClick={add}
                className='w-full bg-gradient-to-br from-tihlde-600 to-tihlde-800 text-white py-3 rounded-lg text-center hover:from-tihlde-500 hover:to-tihlde-700'
            >
                { session ? 'Legg i handlekurv' : 'Logg inn for å handle' }
            </button>
        </div>
    );
};


export default AddToCart;