'use client';

import { isEmptyObject } from '@/app/utils/object';
import { Discount, Image, ProductCategory, Size } from '@prisma/client';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';


export interface ProductShowcaseInterface {
    name: string;
    description: string;
    price: number;
    total_stock: number;
    category: ProductCategory | undefined;
    sizes: Size[];
    discount: Discount | undefined;
    preOrder: boolean;
    information?: string;
    images?: Image[];

};

interface ProductShowcaseProps {
    product: ProductShowcaseInterface;
};

const ProductShowcase = ({
    product
}: ProductShowcaseProps) => {
    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger asChild>
                <button
                    className='w-44 bg-gray-800 text-white font-semibold rounded-md py-3'
                >
                    Forhåndsvisning
                </button>
            </AlertDialog.Trigger>

            <AlertDialog.Portal>
                <AlertDialog.Overlay className='fixed inset-0 bg-black bg-opacity-50' />
                <AlertDialog.Content
                    className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md w-[90%] h-[70%]'
                >
                    <AlertDialog.Cancel className='absolute top-0 right-0 m-3'>
                        <Cross2Icon />
                    </AlertDialog.Cancel>

                    { isEmptyObject(product) && (
                        <div className='h-full flex items-center justify-center'>
                            <h1 className='text-2xl font-semibold'>
                                Ingen felter er fylt ut
                            </h1>
                        </div>
                    ) }

                    { !isEmptyObject(product) &&
                    <div className='py-12'>
                        <div className='flex justify-center space-x-24 px-24 pb-12'>
                            <div className='max-w-lg w-full'>
                                <div className='flex items-center space-x-4 pb-4'>
                                    { product.category &&
                                        <div className='px-2 py-1 rounded-md bg-indigo-200 text-indigo-950 border border-indigo-950'>
                                            <h1 className='text-sm'>
                                                { product.category?.name }
                                            </h1>
                                        </div>
                                    }

                                    { product.discount && (
                                        <div className='px-2 py-1 rounded-md bg-sky-200 text-sky-950 border border-sky-950'>
                                            <h1 className='text-sm'>
                                                { product.discount.discount_percent }% rabatt
                                            </h1>
                                        </div>
                                    )}

                                    <div className='px-2 py-1 rounded-md bg-emerald-200 text-emerald-950 border border-emerald-950'>
                                        <h1 className='text-sm'>
                                            { product.total_stock } på lager
                                        </h1>
                                    </div>
                                </div>

                                <div className='space-y-8 pb-10'>
                                    <h1 className='text-4xl font-bold'>
                                        { product.name }
                                    </h1>
                                    <p>
                                        { product.description }
                                    </p>
                                </div>

                                <div className='pb-20 flex items-center justify-between'>
                                    <div>
                                        <h1 className='text-xl font-bold'>
                                            Pris: <span className={`${ product.discount ? 'line-through text-gray-400' : '' }`}>
                                                { product.price }
                                            </span> <span>
                                                { product.discount && product.price - product.price * product.discount.discount_percent / 100 }    
                                            </span> nok
                                        </h1>
                                    </div>

                                    {/* {   product.size &&
                                        <div className='px-6 py-1 bg-gray-100 rounded-md border border-gray-300'>
                                            <h1 className='font-semibold'>
                                                { product.size?.name }
                                            </h1>
                                        </div>
                                    } */}
                                </div>

                                <div className='flex justify-center'>
                                    <button
                                        disabled 
                                        className='px-16 py-4 rounded-lg bg-indigo-700 text-white'
                                    >
                                        Legg til i handlekurv
                                    </button>
                                </div>
                            </div>

                            <div className='w-full space-y-2'>
                                <div className='w-full'>
                                    <img 
                                        className='w-full rounded-lg object-cover'
                                        src={product.images?.[0]?.url}
                                    />
                                </div>
                                <div className='grid grid-cols-3 gap-x-2'>
                                    { product.images?.slice(1, 4).map((image, index) => (
                                        <div
                                            key={index}
                                            className='relative w-full'
                                        >   
                                            <div 
                                                className='absolute inset-0 bg-gray-300 bg-opacity-40 rounded-lg'
                                            />
                                            <img 
                                                className='rounded-lg object-cover'
                                                src={image.url}
                                            />
                                        </div>
                                    )) }
                                </div>
                            </div>
                        </div>
                    </div>}
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    );
};


export default ProductShowcase;