'use client';

import * as ScrollArea from '@radix-ui/react-scroll-area';

// import Product from "@/app/types/product";
import { Product } from '@prisma/client';
import Link from 'next/link';


const ScrollProducts = ({ products }: { products: Product[] }) => {
    return (
        <ScrollArea.Root className='w-full h-44'>
            <ScrollArea.Viewport className='w-full h-full'>
                {products.map((product, index) => <ScrollProduct 
                                key={index} 
                                product={product}
                                border={index !== products.length - 1} 
                            />
                )}
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar orientation="vertical">
                <ScrollArea.Thumb />
            </ScrollArea.Scrollbar>
        </ScrollArea.Root>
    );
};

const ScrollProduct = ({ product, border }: { product: Product, border: boolean }) => {
    return (
        <Link
            href={`/admin/product/${product.id}`}
            className={`${border ? 'border-b border-gray-200' : ''} px-4 py-2 block hover:bg-gray-50 text-center`}
        >
            { product.name }
        </Link>
    );
};


export default ScrollProducts;