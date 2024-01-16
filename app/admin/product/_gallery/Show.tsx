'use client';

import { Image } from "@prisma/client";
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon, Component1Icon, Cross2Icon } from "@radix-ui/react-icons";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import * as Dialog from '@radix-ui/react-dialog';
import axios from "axios";
import { toast } from "react-toastify";


interface ShowGalleryButtonProps {
    images: Image[];
    setImages: Dispatch<SetStateAction<Image[]>>
};

const ShowGallery = ({ images, setImages }: ShowGalleryButtonProps) => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [showedImages, setShowedImages] = useState<Image[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageCount, setPageCount] = useState<number>(0);


    const getImages = async () => {
        setLoading(true);

        try {
            const res = await axios.get(`/api/files/?skip=${currentPage}&take=12`);
            const data = await res.data;

            setShowedImages(data.images);
            setPageCount(Math.ceil(data.count / 12));
        } catch (e) {
            toast.error('Noe gikk galt med visning av bildegalleri');
        } finally {
            setLoading(false);
        }
    };

    const toggleImage = (image: Image) => {
        const imageExists = images.find(i => i.id === image.id);

        if (imageExists) {
            setImages(prev => prev.filter(i => i.id !== image.id));
            toast.success('Bilde fjernet');
        } else {
            if (images.length >= 4) return;
            setImages(prev => [...prev, image]);
            toast.success('Bilde lagt til');
        }
    };

    useEffect(() => {
        getImages();
    }, [currentPage]);

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <button
                    className={`${images.length >= 4 || !showedImages.length ? '' : 'hover:bg-gray-100'} w-full flex items-center justify-center space-x-2 font-semibold rounded-md py-3 bg-gray-50 border border-gray-300`}
                    disabled={images.length >= 4 || !showedImages.length}
                >
                    <Component1Icon />
                    <p>
                        { images.length >= 4 && showedImages.length && 'Maks antall bilder valgt' }
                        { images.length < 4 && !showedImages.length && 'Ingen bilder i galleri' }
                        { images.length < 4 && showedImages.length > 0 && 'Velg bilder fra galleri' }
                    </p>
                </button>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className='fixed inset-0 bg-black bg-opacity-50' />
                <Dialog.Content
                    className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md max-w-5xl w-full'
                >
                    <Dialog.Close className='absolute top-0 right-0 m-3'>
                        <Cross2Icon />
                    </Dialog.Close>
                    
                    <div className='mt-12 mx-auto space-y-4 px-24'>
                        <div className='flex items-center space-x-12'>
                            { pageCount > 1 && (
                                <div className='flex items-center space-x-2'>
                                    <button
                                        onClick={() => setCurrentPage(prev => prev - 1)}
                                        className='px-3 py-1 rounded-md border border-gray-300'
                                        disabled={currentPage === 1}
                                    >
                                        <ChevronLeftIcon />
                                    </button>
                                    <p>
                                        { currentPage } av { pageCount }
                                    </p>
                                    <button
                                        onClick={() => setCurrentPage(prev => prev + 1)}
                                        className='px-3 py-1 rounded-md border border-gray-300'
                                        disabled={currentPage === pageCount}
                                    >
                                        <ChevronRightIcon />
                                    </button>
                                </div>
                            
                            ) }
                            {
                                images.length >= 4 && (
                                    <h1>
                                        Du kan ikke legge til flere enn 4 bilder
                                    </h1>
                                )
                            }
                        </div>

                        <div className='grid grid-cols-4 gap-3 pb-12'>
                            { isLoading && Array.from({ length: 12 }).map((_, index) => (
                                <div
                                    key={index}
                                    className='w-44 h-24 bg-gray-200 rounded-md animate-pulse'
                                />
                            ))}
                            { !isLoading && showedImages.map((image, index) => (
                                <div
                                    onClick={() => toggleImage(image)}
                                    key={index}
                                    className='relative w-44 rounded-md'
                                >
                                    <div
                                        className={`absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center ${images.find(i => i.id === image.id) ? '' : 'hidden'}`}
                                    >
                                        <CheckIcon className='w-4 h-4 text-white' />
                                    </div>
                                    <img
                                        src={image.url}
                                        className='w-44 object-cover rounded-md cursor-pointer'
                                    />
                                </div>   
                            )) }
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}


export default ShowGallery;