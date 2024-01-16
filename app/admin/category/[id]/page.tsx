import { notFound } from "next/navigation";

import Template from "../../_components/Template";
import Header from "../../_components/Header";
import Empty from "../../_components/Empty";
import { getCategories, getCategory } from "@/app/db/category";
import PathNavigation from "@/app/components/links/PathNavigation";
import ScrollView, { ScrollItem } from "../../_components/ScrollView";
import CategoryForm from "../CategoryForm";
import DeleteCategory from "../DeleteCategory";
import { CATEGORY_EDIT_PAGE_PATHS } from "@/app/utils/paths";
import HeaderWrapper from "../../_components/wrapper/Header";
import ContentWrapper from "../../_components/wrapper/Content";
import FormWrapper from "../../_components/wrapper/Form";
import UnderConstruction from "@/app/components/UnderConstructions";


interface EditCategoryProps {
    params: { id: string }
};

const EditCategory = async ({ params }: EditCategoryProps) => {
    return <UnderConstruction />;
    const category = await getCategory(params.id);

    if (!category) notFound();

    return (
        <Template>
            <HeaderWrapper>
                <div className='space-y-2'>
                    <PathNavigation paths={CATEGORY_EDIT_PAGE_PATHS} />
                    <Header 
                        title='Rediger kategori'
                        description='Rediger en eksisterende kategori'
                    />
                </div>
            </HeaderWrapper>

            <ContentWrapper>
                <FormWrapper>
                    <CategoryForm 
                        category={category}
                    />
                </FormWrapper>
            </ContentWrapper>
        </Template>
    );
};


export default EditCategory;