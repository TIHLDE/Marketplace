import { ProductInfo } from "@/app/db/product";
import ProductImage from "./Image";


interface ProductItemProps {
    product: ProductInfo & { count: number };
    border: boolean;
};

const ProductListItem = ({ product, border }: ProductItemProps) => {
    return (
        <div className={`${border ? 'border-b border-gray-300 pb-4' : ''}`}>
            <div className='flex space-x-4 w-full'>
                <div className='w-28 h-28'>
                    <ProductImage image={product.images?.[0]?.image} />
                </div>
                <div className='flex items-center justify-between'>
                    <div className='flex flex-col py-4'>
                        <div className='space-y-4'>
                            <h1 className='font-semibold text-lg'>
                                { product.name }
                            </h1>
                        </div>
                    </div>

                    <div>
                        <h1 className='text-lg font-medium'>
                            { product.count }x
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default ProductListItem;