import { Discount, Product} from '@prisma/client';


const ProductPrice = ({
    price,
    discount_percent
}: Pick<Product, 'price'> & Pick<Discount, 'discount_percent'>) => {
    if (!discount_percent) return (
        <h1 className='text-gray-500'>
            { price } NOK
        </h1>
    );

    return (
        <h1 className='text-gray-500'>
            { price - (price * (discount_percent / 100)) } NOK
        </h1>
    );
};


export default ProductPrice;