import Template from "../../_components/Template";
import Header from "../../_components/Header";
import ProductForm from "../ProductForm";
import { getSizes } from "@/app/db/size";
import { getCategories } from "@/app/db/category";
import { getDiscounts } from "@/app/db/discount";
import HeaderWrapper from "../../_components/wrapper/Header";
import PathNavigation from "@/app/components/links/PathNavigation";
import { PRODUCT_NEW_PAGE_PATHS } from "@/app/utils/paths";
import ContentWrapper from "../../_components/wrapper/Content";
import FormWrapper from "../../_components/wrapper/Form";
import UnderConstruction from "@/app/components/UnderConstructions";


const NewProduct = async () => {
    return <UnderConstruction />;
    const sizes = await getSizes();
    const categories = await getCategories();
    const discounts = await getDiscounts();

    return (
        <Template>
            <HeaderWrapper>
                <div className='space-y-2'>
                    <PathNavigation paths={PRODUCT_NEW_PAGE_PATHS} />
                    <Header 
                        title='Produkter'
                        description='Administrer produkter'
                    />
                </div>
            </HeaderWrapper>

            <ContentWrapper>
                <FormWrapper>
                    <ProductForm 
                        sizes={sizes}
                        categories={categories} 
                        discounts={discounts}
                    />
                </FormWrapper>
            </ContentWrapper>
        </Template>
    );
};


export default NewProduct;