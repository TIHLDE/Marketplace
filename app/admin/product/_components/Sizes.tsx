import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Dispatch, SetStateAction, useReducer, useRef, useState } from "react";

export type SizeListItem = {
    id: string;
    size: string;
    stock: number;
};

interface SizeListingProps {
    sizes: SizeListItem[];
    setSizes: Dispatch<SetStateAction<SizeListItem[]>>;

};

const SizeListing = ({
    sizes,
    setSizes
}: SizeListingProps) => {
    const [dragging, setDragging] = useState<boolean>(false);
    const draggedSize = useRef<number>(0);
    const draggedOverSize = useRef<number>(0);

    const handleDragStart = (index: number) => {
        draggedSize.current = index;
        setDragging(true);
    };
    
    const handleDragEnter = (index: number) => {
        draggedOverSize.current = index;
    };

    const handleSort = () => {
        if (!sizes) return

        const sizesCopy = [...sizes];
        const draggedImageItem = sizesCopy[draggedSize.current];
        const draggedOverImageItem = sizesCopy[draggedOverSize.current];

        sizesCopy[draggedSize.current] = draggedOverImageItem;
        sizesCopy[draggedOverSize.current] = draggedImageItem;
        
        setSizes(sizesCopy);
        setDragging(false);
    };

    const handleMoveUp = (index: number) => {
        if (index === 0) return;

        const sizesCopy = [...sizes];
        const temp = sizesCopy[index];
        sizesCopy[index] = sizesCopy[index - 1];
        sizesCopy[index - 1] = temp;

        setSizes(sizesCopy);
    };

    const handleMoveDown = (index: number) => {
        if (index === sizes.length - 1) return;

        const sizesCopy = [...sizes];
        const temp = sizesCopy[index];
        sizesCopy[index] = sizesCopy[index + 1];
        sizesCopy[index + 1] = temp;

        setSizes(sizesCopy);
    };

    const handleRemove = (index: number) => {
        const sizesCopy = [...sizes];
        sizesCopy.splice(index, 1);
        setSizes(sizesCopy);
    };

    return (
        <div className='grid grid-cols-4 gap-4'>
            {sizes.map((size, index) => (
                <div 
                    key={index} 
                    className={`cursor-pointer relative rounded-md border border-gray-300 bg-gray-50 p-2 ${
                        dragging && draggedSize.current === index
                          ? 'opacity-50 transition-opacity duration-300'
                          : 'transition-transform duration-300'
                      }`}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragEnter={() => handleDragEnter(index)}
                    onDragEnd={handleSort}
                    onDragOver={e => e.preventDefault()}
                >
                    <div className='pb-3 flex items-center justify-between'>
                        <h1 className='font-semibold'>
                            {size.size}
                        </h1>
                        <p>
                            {size.stock}
                        </p>
                    </div>
                    <div className='flex items-center justify-between'>
                        <div
                            onClick={() => handleMoveUp(index)}
                            className={`${index === 0 ? 'hidden' : ''}`}
                        >
                            <ChevronLeftIcon className='w-5 h-5' />
                        </div>
                        <div className={`${index === 0 || index === sizes.length - 1 ? 'mx-auto' : ''}`}>
                            <h1>
                                Index: {index + 1}
                            </h1>
                        </div>
                        <div
                            onClick={() => handleMoveDown(index)}
                            className={`${index === sizes.length - 1 ? 'hidden' : ''}`}
                        >
                            <ChevronRightIcon className='w-5 h-5' />
                        </div>
                    </div>

                    <div 
                        onClick={() => handleRemove(index)}
                        className='absolute -top-2 -left-2 w-5 h-5 rounded-full bg-coral-red-900 flex items-center justify-center hover:bg-coral-red-700'
                    >
                      <p className='text-white text-xs'>
                        X
                      </p>
                    </div>
                </div>
            
            ))}
        </div>
    );
};


export default SizeListing;