import Product from "../components/Product";
import ProductsWrapper from "../components/wrapper/Products";
import { getPreOrderProducts } from "../db/product";


const PreOrderProducts = async () => {
    const products = await getPreOrderProducts(4);

    if (!products.length) return;

    return (
        <ProductsWrapper
            header='Forhåndsbestillinger'
            subheader='Her er noen produkter som kan forhåndsbestilles'
            href='/products'
        >
            <div className='grid grid-cols-4 w-full mx-auto gap-4'>
                { products.map((product) => <Product key={product.id} product={product} />) }
            </div>
        </ProductsWrapper>
    );
};


export default PreOrderProducts;