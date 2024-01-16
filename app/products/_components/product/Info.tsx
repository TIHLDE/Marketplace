import ProductInfoSeparator from "./Separator";

interface ProductInfoProps {
    price: number;
    category: string;
    preOrder: boolean;
    discount?: number;
};

const ProductInfo = ({
    price,
    category,
    discount
}: ProductInfoProps) => {
    return (
        <div className='flex items-center space-x-3'>
            <ProductPrice 
                price={price}
                discount={discount}
            />
            <ProductInfoSeparator />
            <h1 className='text-tihlde-500'>
                { category }
            </h1>
        </div>
    );
};

const ProductPrice = ({
    price,
    discount 
}: Pick<ProductInfoProps, 'price' | 'discount'>) => {
    if (!discount) return (
        <h1 className='text-lg font-bold'>
            { price } nok
        </h1>
    );

    return (
        <div className='flex items-center space-x-2'>
            <h1 className='text-gray-300 line-through'>
                { price } nok
            </h1>
            <h1 className='text-lg font-bold'>
                { price - (price * (discount / 100)) } nok
            </h1>
        </div>
    );
};


export default ProductInfo;