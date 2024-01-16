import Product from "../components/Product";
import ProductsWrapper from "../components/wrapper/Products";
import { getLatestProducts } from "../db/product";


const LatestProducts = async () => {
    const products = await getLatestProducts(4);

    if (!products.length) return;

    return (
        <ProductsWrapper
            header='Nye produkter'
            subheader='Her er noen nye produkter'
            href='/products'
        >
            <div className='grid grid-cols-4 w-full mx-auto gap-4'>
                { products.map((product) => <Product key={product.id} product={product} />) }
            </div>
        </ProductsWrapper>
    );
};


export default LatestProducts;