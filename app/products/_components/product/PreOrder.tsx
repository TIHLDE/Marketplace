import { CheckIcon, InfoCircledIcon } from "@radix-ui/react-icons";


const ProductPreOrder = ({ preOrder }: { preOrder: boolean }) => {
    if (!preOrder) {
        return (
            <div className='flex items-center space-x-2'>
                <CheckIcon className='w-6 h-6 text-emerald-500' />
                <h1 className='text-sm text-gray-500'>
                    Dette produktet kan hentes fortløpende
                </h1>
            </div>
        );
    }

    return (
        <div className='flex items-center space-x-2'>
            <InfoCircledIcon className='w-6 h-6 text-tihlde-600' />
            <h1 className='text-sm text-gray-500'>
                Dette produktet kan forhåndsbestilles
            </h1>
        </div>
    );
};


export default ProductPreOrder;