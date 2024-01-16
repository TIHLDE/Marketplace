import { getLatestProductTransactions, getProduct } from "@/app/db/product";
import Header from "../../_components/Header";
import Template from "../../_components/Template";
import HeaderWrapper from "../../_components/wrapper/Header";
import { notFound } from "next/navigation";
import PathNavigation from "@/app/components/links/PathNavigation";
import { PRODUCT_PAGE_PATHS } from "@/app/utils/paths";
import EditLink from "@/app/components/links/Edit";
import UnderConstruction from "@/app/components/UnderConstructions";


interface ProductProps {
    params: { id: string };
};

const ProductPage = async ({ params }: ProductProps) => {
    return <UnderConstruction />;
    const product = await getProduct(params.id);

    if (!product) notFound();

    const latestTransactions = await getLatestProductTransactions(product.id);

    return (
        <Template>
            <HeaderWrapper>
                <div className='space-y-2'>
                    <PathNavigation paths={PRODUCT_PAGE_PATHS} />
                    <Header
                        title={product.name}
                        description='Administer produkt'
                    />
                </div>
                <EditLink 
                    href={`/admin/product/${product.id}/edit`}
                    title='Rediger'
                />
            </HeaderWrapper>


        </Template>
    );
};


export default ProductPage;