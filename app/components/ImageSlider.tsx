'use client';

import * as React from "react";

import { Image as ImageType } from "@prisma/client";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import cn from "@/app/utils/cn";
import Link from "next/link";


interface ImageSliderProps extends React.HTMLAttributes<HTMLDivElement> {
    images: ImageType[] | undefined;
    auto?: boolean;
    interval?: number;
    href?: string;
};

const ImageSlider = ({ className, images, auto=false, interval=3000, href }: ImageSliderProps) => {
    
    if (!images || !images.length) {
        const DefaultImage = () => (
            <img
                src='/default-image.png'
                alt='Produktbilde'
                className='w-12'
            />
        );

        return (
            <>
                {
                    href ? (
                        <Link
                            href={href}
                            className={cn('w-full flex items-center h-full justify-center bg-gray-100 border border-gray-200 rounded-xl', className)}
                        >
                            <DefaultImage />
                        </Link>
                    ) : (
                        <div
                            className={cn('w-full flex items-center h-full justify-center bg-gray-100 border border-gray-200 rounded-xl', className)}
                        >
                            <DefaultImage />
                        </div>
                    )
                }
            </>
        );
    };

    const [currentImage, setCurrentImage] = useState<number>(0);

    const prev = () => setCurrentImage(currentImage === 0 ? images.length - 1 : currentImage - 1);
    const next = () => setCurrentImage(currentImage === images.length - 1 ? 0 : currentImage + 1);

    useEffect(() => {
        if (!auto) return;

        const slideInterval = setInterval(() => {
            setCurrentImage(prev => prev === images.length - 1 ? 0 : prev + 1)
        }, interval);
        return () => clearInterval(slideInterval);
    }, []);

    const Image = () => (
        <img
            src={images[currentImage].url}
            alt={`Image ${currentImage + 1}`}
            className={cn('w-full object-cover', className)}
        />
    );

    return (
        <div className='relative group w-full overflow-hidden rounded-xl'>
            {
                href ? (
                    <Link
                        href={href}
                        className='flex transition-transform ease-out duration-500'
                        style={{ transform: `translateX(-${currentImage * 100}%)` }}
                    >
                        {images.map((_, index) => (
                            <Image key={index} />
                        ))}
                    </Link>
                ) : (
                    <div 
                        className='flex transition-transform ease-out duration-500'
                        style={{ transform: `translateX(-${currentImage * 100}%)` }}
                    >
                        {images.map((_, index) => (
                            <Image key={index} />
                        ))}
                    </div>
                )
            }

            {images.length > 1 && (
                <>
                    <div
                        className={`hidden absolute inset-0 group-hover:flex items-center justify-between p-4`}
                    >
                        <button
                            onClick={prev}
                            className='p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white'
                        >
                            <ChevronLeftIcon />
                        </button>
                        <button
                            onClick={next}
                            className='p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white'
                        >
                            <ChevronRightIcon />
                        </button>
                    </div>

                    <div className='absolute bottom-4 right-0 left-0'>
                        <div className='flex items-center justify-center gap-2'>
                        {images.map((_, index) => (
                            <div
                                key={index}
                                className={`
                                transition-all w-2 h-2 bg-white rounded-full
                                ${currentImage === index ? 'p-1' : 'bg-opacity-50'}
                                `}
                            />
                        ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};


export default ImageSlider;