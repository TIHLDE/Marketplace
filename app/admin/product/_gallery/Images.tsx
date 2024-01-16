import { Image } from "@prisma/client";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { Dispatch, SetStateAction, useRef, useState } from "react";


interface ImageListingProps {
    images: Image[];
    setImages: Dispatch<SetStateAction<Image[]>>
};

const ImageListing = ({
    images,
    setImages
}: ImageListingProps) => {
    const [dragging, setDragging] = useState<boolean>(false);
    const draggedImage = useRef<number>(0);
    const draggedOverImage = useRef<number>(0);

    const handleDragStart = (index: number) => {
        draggedImage.current = index;
        setDragging(true);
    };
    
    const handleDragEnter = (index: number) => {
        draggedOverImage.current = index;
    };

    const handleSort = () => {
        if (!images) return

        const imagesCopy = [...images];
        const draggedImageItem = imagesCopy[draggedImage.current];
        const draggedOverImageItem = imagesCopy[draggedOverImage.current];

        imagesCopy[draggedImage.current] = draggedOverImageItem;
        imagesCopy[draggedOverImage.current] = draggedImageItem;
        
        setImages(imagesCopy);
        setDragging(false);
    };

    const handleMoveUp = (index: number) => {
        if (index === 0) return;

        const imagesCopy = [...images];
        const temp = imagesCopy[index];
        imagesCopy[index] = imagesCopy[index - 1];
        imagesCopy[index - 1] = temp;

        setImages(imagesCopy);
    };

    const handleMoveDown = (index: number) => {
        if (index === images.length - 1) return;

        const imagesCopy = [...images];
        const temp = imagesCopy[index];
        imagesCopy[index] = imagesCopy[index + 1];
        imagesCopy[index + 1] = temp;

        setImages(imagesCopy);
    };

    const handleRemove = (index: number) => {
        const imagesCopy = [...images];
        imagesCopy.splice(index, 1);
        setImages(imagesCopy);
    };

    return (
        <>
            {images.map((image, index) => (
                <div 
                    key={index}
                    className={`relative cursor-pointer w-full bg-gray-50 flex justify-between items-center rounded-md border border-gray-300 ${
                        dragging && draggedImage.current === index
                          ? 'opacity-50 transition-opacity duration-300'
                          : 'transition-transform duration-300'
                      }`}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragEnter={() => handleDragEnter(index)}
                    onDragEnd={handleSort}
                    onDragOver={e => e.preventDefault()}
                >
                    <div className='flex items-center space-x-2'>
                        <img
                            className='w-32 rounded-md' 
                            src={image.url} 
                            alt={image.id} 
                        />

                        <div>
                            <h1>
                                Index: {index + 1}
                            </h1>
                            <p
                                onClick={() => handleRemove(index)}
                                className='text-coral-red-500 text-sm'
                            >
                                Fjern
                            </p>
                        </div>
                    </div>

                    <div className='flex flex-col px-6'>
                      <div
                        onClick={() => handleMoveUp(index)}
                        className={`${index === 0 ? 'hidden' : 'cursor-pointer'}`}
                    >
                        <ChevronUpIcon className='w-5 h-5' />
                      </div>
                      <div
                        onClick={() => handleMoveDown(index)}
                        className={`${index === images.length - 1 ? 'hidden' : 'cursor-pointer'}`}
                      >
                        <ChevronDownIcon className='w-5 h-5' />
                      </div>
                    </div>
                </div>
            ))}
        </>
    );
};


export default ImageListing;