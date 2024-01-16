import { Stock } from "@prisma/client";


interface SizeSelectorProps {
    sizes: (Stock & {
        size: {
            id: string;
            name: string;
            value: string;
            createdAt: Date;
            updatedAt: Date;
        };
    })[];
    currentSize: string | null;
    setSize: (size: string | null) => void;
};

const SizeSelector = ({ sizes, currentSize, setSize }: SizeSelectorProps) => {
    return (
        <div className='grid grid-cols-7 gap-2'>
            { sizes.map((size, index) => (
                <div 
                    key={index}
                    onClick={() => setSize(size.size.id)}
                    className={`${currentSize === size.size.id ? 'border-gray-900' : 'border-gray-200'} py-1 cursor-pointer rounded-md bg-gray-100 border flex justify-center items-center`}
                >
                    <p className={`${currentSize === size.size.id ? 'font-medium text-gray-900' : 'text-gray-500'} text-sm`}>
                        { size.size.value }
                    </p>
                </div>
            )) }
        </div>
    );
};


export default SizeSelector;