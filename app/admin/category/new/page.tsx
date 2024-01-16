import Header from "../../_components/Header";
import Template from "../../_components/Template";
import CategoryForm from "../CategoryForm";
import PathNavigation from "@/app/components/links/PathNavigation";
import { CATEGORY_NEW_PAGE_PATHS } from "@/app/utils/paths";
import HeaderWrapper from "../../_components/wrapper/Header";
import ContentWrapper from "../../_components/wrapper/Content";
import FormWrapper from "../../_components/wrapper/Form";
import UnderConstruction from "@/app/components/UnderConstructions";


const NewCategory = () => {
    return <UnderConstruction />;
    return (
        <Template>
            <HeaderWrapper>
                <div className='space-y-2'>
                    <PathNavigation paths={CATEGORY_NEW_PAGE_PATHS} />
                    <Header
                        title='Ny kategori'
                        description='Opprett en ny kategori'
                    />
                </div>
            </HeaderWrapper>

            <ContentWrapper>
                <FormWrapper>
                    <CategoryForm />
                </FormWrapper>
            </ContentWrapper>
        </Template>
    );
};


export default NewCategory;