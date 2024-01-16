import Template from "../_components/Template";
import Header from "../_components/Header";
import NewLink from "@/app/components/links/New";
import ProductTable from "./ProductTable";
import Empty from "../_components/Empty";
import { getProductCount, getProductsWithInfo } from "@/app/db/product";
import HeaderWrapper from "../_components/wrapper/Header";
import PathNavigation from "@/app/components/links/PathNavigation";
import { PRODUCT_PAGE_PATHS } from "@/app/utils/paths";
import Pagination from "@/app/components/Pagination";
import UnderConstruction from "@/app/components/UnderConstructions";


export interface ProductQuery {
    page: string;
};

interface ProductPageProps {
    searchParams: ProductQuery;
};

const ProductPage = async ({ searchParams }: ProductPageProps) => {
    return <UnderConstruction />;
    const page = parseInt(searchParams.page) || 1;
    const pageSize = 10;

    const productCount = await getProductCount();
    const products = await getProductsWithInfo(
        (page - 1) * pageSize,
        pageSize
    );

    return (
        <Template>
            <HeaderWrapper>
                <div className='space-y-2'>
                    <PathNavigation paths={PRODUCT_PAGE_PATHS} />
                    <Header
                        title='Produkter'
                        description='Administrer produkter'
                    />
                </div>
                <NewLink 
                    href='/admin/product/new'
                    title='Nytt produkt'
                />
            </HeaderWrapper>

            <Pagination 
                pageSize={pageSize}
                currentPage={page}
                itemCount={productCount}
                className='pb-4'
            />

            { !products.length
                ? <Empty text='Fant ingen produkter' />
                : <ProductTable products={products} />
            }
        </Template>
    );
};


export default ProductPage;