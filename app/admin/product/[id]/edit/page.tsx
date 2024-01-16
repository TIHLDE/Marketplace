import Template from "@/app/admin/_components/Template";
import ContentWrapper from "@/app/admin/_components/wrapper/Content";
import FormWrapper from "@/app/admin/_components/wrapper/Form";
import HeaderWrapper from "@/app/admin/_components/wrapper/Header";
import PathNavigation from "@/app/components/links/PathNavigation";
import { getCategories } from "@/app/db/category";
import { getDiscounts } from "@/app/db/discount";
import { ProductWithImages, getProductWithImages } from "@/app/db/product";
import { getSizes } from "@/app/db/size";
import { getProductEditPagePaths } from "@/app/utils/paths";
import { notFound } from "next/navigation";
import ProductForm from "../../ProductForm";
import Header from "@/app/admin/_components/Header";



interface EditProductProps {
    params: { id: string }
};

const EditProduct = async ({ params }: EditProductProps) => {
    const sizes = await getSizes();
    const categories = await getCategories();
    const discounts = await getDiscounts();

    const product = await getProductWithImages(params.id);
    
    if (!product) notFound();
    
    return (
        <Template>
            <HeaderWrapper>
                <div className='space-y-2'>
                    <PathNavigation paths={getProductEditPagePaths(product.id)}/>
                    <Header 
                        title='Produkter'
                        description='Administrer produkter'
                    />
                </div>
            </HeaderWrapper>

            <ContentWrapper>
                <FormWrapper>
                    <ProductForm
                        product={product as ProductWithImages}
                        sizes={sizes}
                        categories={categories} 
                        discounts={discounts}
                    />
                </FormWrapper>
            </ContentWrapper>
        </Template>
    );
};


export default EditProduct;