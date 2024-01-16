'use client';

import { Image } from "@prisma/client";
import { useState } from "react";


const ProductImageDisplay = ({ images }: { images: Image[] | undefined }) => {

    if (!images || !images.length) {
        return (
            <div
                className='w-full bg-gray-200 rounded-xl flex items-center justify-center h-96'
            >
                <img 
                    src='/default-image.png'
                    className='w-20'
                />
            </div>
        );
    }

    const [currentImage, setCurrentImage] = useState<Image>(images[0]);
    
    return (
        <div className='w-full space-y-2'>
            <img
                src={currentImage.url}
                className='w-full h-96 object-cover rounded-xl'
            />

            <div className='grid grid-cols-3 gap-x-2'>
                { images.filter((image) => image !== currentImage).map((image) => (
                    <button
                        key={image.id}
                        className='relative'
                        onClick={() => setCurrentImage(image)}
                    >
                        <img 
                            src={image.url}
                            className='w-full object-cover rounded-xl'
                        />
                        <div
                            className='absolute top-0 left-0 w-full h-full bg-gray-300 bg-opacity-50 rounded-xl'
                        />
                    </button>
                ))}
            </div>
        </div>
    );
};


export default ProductImageDisplay;