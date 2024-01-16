'use client'

import { Image } from "@prisma/client";
import { ProductInfo } from "../db/product";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, DotFilledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import ImageSlider from "./ImageSlider";


interface ProductProps {
    product: ProductInfo;
};

const Product = ({ product }: ProductProps) => {
    return (
        <div
            className=''
        >
            <div className='pb-2'>
                <ImageSlider 
                    images={product.images?.map(i => i.image)} 
                    auto={true}
                    className='h-60'
                    href={`/products/${product.id}`}
                />
            </div>

            <Link
                href={`/products/${product.id}`}
                className='space-y-3 pb-6'
            >
                <div>
                    <h1 className='font-semibold'>
                        { product.name }
                    </h1>
                    <p className='text-sm text-gray-500'>
                        { product.category?.name }
                    </p>
                    <div className='w-full grid grid-cols-4 gap-2 py-2'>
                        { product.sizes.map((size, index) => (
                            <div
                                key={index}
                                className='p-1 flex justify-center items-center rounded-md bg-tihlde-100'
                            >
                                <p className='text-xs text-tihlde-600'>
                                    { size.size.value }
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <p className='font-semibold'>
                    { product.price } NOK
                </p>
            </Link>
        </div>
    );
};

const Image = ({ images, id }: { images: Image[] | undefined, id: string }) => {    
    if (!images || !images.length) return (
        <Link
            href={`/products/${id}`} 
            className='w-full flex items-center h-60 justify-center bg-gray-100 rounded-xl'
        >
            <img 
                className='w-12'
                src='/default-image.png'
            />
        </Link>
    );

    const [selectedImage, setSelectedImage] = useState<Image>(images[0]);
    const [hover, setHover] = useState<boolean>(false);

    const nextImage = () => {
        const index = images.indexOf(selectedImage);
        if (index === images.length - 1) return;
        setSelectedImage(images[index + 1]);
    };

    const prevImage = () => {
        const index = images.indexOf(selectedImage);
        if (index === 0) return;
        setSelectedImage(images[index - 1]);
    };
    
    return (
        <div 
            className='relative'
            onMouseOver={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <Link
                href={`/products/${id}`}
            >
                <img
                    src={selectedImage.url}
                    className='w-full object-cover rounded-xl'
                />
            </Link>

            <button 
                className={`${!hover || selectedImage === images[0] ? 'hidden' : 'flex'} absolute top-1/2 left-1 -translate-y-1/2 w-8 h-8 rounded-full bg-white items-center justify-center`}
                onClick={prevImage}
            >
                <ChevronLeftIcon />
            </button>

            <button 
                className={`${!hover || selectedImage === images.at(-1) ? 'hidden' : 'flex'} absolute top-1/2 right-1 -translate-y-1/2 w-8 h-8 rounded-full bg-white items-center justify-center`}
                onClick={nextImage}
            >
                <ChevronRightIcon />
            </button>
        </div>
    );
};


export default Product;