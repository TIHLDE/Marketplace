'use client';

import { removeFromCart, removeFromLocalCart } from "@/app/functions/cart";
import ProductInfoSeparator from "@/app/products/_components/product/Separator";
import { CartContext, CartContextType, CartProduct } from "@/app/providers";
import Link from "next/link";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import BackDropBlur from "../ui/BackdropBlur";
import SideMenuWrapper from "../wrapper/SideMenu";
import { CartIcon } from "../../components/icons";


const Cart = () => {
    const { cart, setCart } = useContext(CartContext) as CartContextType;
    const [open, setOpen] = useState<boolean>(false);

    const remove = (product: CartProduct) => {
        const newCart = removeFromCart(product, cart);
        setCart(newCart);
        removeFromLocalCart(product);

        toast.success('Produkt fjernet fra handlekurv');
    };

    const openCart = () => {
        setOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeCart = () => {
        setOpen(false);
        document.body.style.overflow = 'unset';
    };

    const getTotalPrice = () => {
        return cart.reduce((acc, curr) => {
            if (!curr.discount) return acc + curr.price * curr.count;
            return acc + (curr.price - (curr.price * (curr.discount / 100))) * curr.count;
        }, 0);
    };

    return (
        <div>
            <button
                onClick={openCart} 
                className='relative'
            >
                    <CartIcon className='text-tihlde-900 hover:text-tihlde-500' />
                    { cart.length > 0 && (
                        <div className='absolute -bottom-2 -left-2 w-5 h-5 rounded-full bg-tihlde-900 border border-tihlde-950 flex items-center justify-center text-white'>
                            <p className='text-sm'>
                                { cart.length }
                            </p>
                        </div>
                    ) }
            </button>

            { open && (
                <>
                    <BackDropBlur />
                    <SideMenuWrapper
                        close={closeCart}
                    >
                        <div className='p-8'>
                            <div className='pb-6'>
                                <h1 className='font-bold text-xl pb-2 border-b border-gray-200'>
                                    Handlevogn ({ cart.length  })
                                </h1>
                            </div>

                            <div>
                                { !cart.length && (
                                    <div className='flex flex-col items-center justify-center space-y-4'>
                                        <h1 className='text-xl font-semibold'>
                                            Handlevognen din er tom
                                        </h1>
                                        <p className='text-gray-500'>
                                            Du har ingen produkter i handlekurven din.
                                        </p>
                                    </div>
                                ) }

                                { cart.length > 0 && (
                                    <div>
                                        <div className='space-y-3 pb-6 border-b border-tihlde-200'>
                                            { cart.map((product, index) => (
                                                <CartItem 
                                                    key={index} 
                                                    product={product} 
                                                    border={index !== cart.length - 1}
                                                    removeFromCart={remove}
                                                />
                                            )) }     
                                        </div>

                                        <div className='flex items-center justify-between mt-2 pb-6'>
                                            <h1 className='font-bold'>
                                                Totalt:
                                            </h1>
                                            <p>
                                                { getTotalPrice() } nok
                                            </p>
                                        </div>

                                        <Link
                                            onClick={closeCart}
                                            href='/checkout'
                                            className='flex justify-center w-full bg-gradient-to-br from-tihlde-600 to-tihlde-800 text-white py-3 rounded-lg hover:from-tihlde-500 hover:to-tihlde-700'
                                        >
                                            Gå til kassen
                                        </Link>
                                    </div>
                                ) }
                            </div>
                        </div>
                    </SideMenuWrapper> 
                </>
            ) }
        </div>
    );
};

const CartItem = ({
    product,
    border,
    removeFromCart
}: { 
    product: CartProduct,
    border: boolean,
    removeFromCart: (product: CartProduct) => void 
}) => {
    return (
        <div className={`${border ? 'border-b border-gray-300 pb-4' : ''}`}>
            <div className='flex items-center space-x-4'>
                <div className='w-24'>
                    <Image 
                        url={product.image}
                    />
                </div>
                <div className='flex items-center justify-between w-full'>
                    <div className='flex flex-col'>
                        <div className='space-y-1'>
                            <h1 className='font-semibold text-sm'>
                                { product.name }
                            </h1>
                            <div className='flex items-center space-x-1'>
                                <ProductPrice 
                                    price={product.price}
                                    discount={product.discount}
                                />
                                <ProductInfoSeparator />
                                <h1 className='text-tihlde-500 text-xs'>
                                    { product.category }
                                </h1>
                                <ProductInfoSeparator />
                                <h1 className='text-tihlde-500 text-xs'>
                                    { product.size }
                                </h1>
                            </div>
                        </div>
                        <button
                            onClick={() => removeFromCart(product)}
                            className='flex justify-start w-8 text-coral-red-500 text-xs hover:text-coral-red-600'
                        >
                            Fjern
                        </button>
                    </div>

                    <div>
                        <h1 className='text-sm font-medium'>
                            { product.count }x
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProductPrice = ({
    price,
    discount
}: Pick<CartProduct, 'price' | 'discount'>) => {
    if (!discount) return (
        <h1 className='text-xs font-bold'>
            { price } nok
        </h1>
    );

    return (
        <h1 className='text-xs font-bold'>
            { price - (price * (discount / 100)) } nok
        </h1>
    );
};

const Image = ({ url }: { url: string | undefined }) => {
    if (!url) {
        return (
            <div
                className='w-full h-12 rounded-lg bg-gray-200 flex items-center justify-center'
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
            src={url}
            className='w-full h-12 object-cover rounded-lg'
        />
    );
};


export default Cart;