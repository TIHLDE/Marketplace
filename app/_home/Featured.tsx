import Product from "../components/Product";
import ProductsWrapper from "../components/wrapper/Products";
import { getFeaturedProducts } from "../db/product";


const FeaturedProducts = async () => {
    const featuredProducts = await getFeaturedProducts(4);

    if (!featuredProducts.length) return;

    return (
        <ProductsWrapper
            header='Anbefalte produkter'
            subheader='Her er noen produkter vi anbefaler'
            href='/products'
        >
            <div className='grid grid-cols-4 w-full mx-auto gap-4'>
                { featuredProducts.map((product) => <Product key={product.id} product={product} />) }
            </div>
        </ProductsWrapper>
    );
};


export default FeaturedProducts;