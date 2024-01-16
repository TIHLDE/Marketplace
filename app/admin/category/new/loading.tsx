import PathNavigation from "@/app/components/links/PathNavigation";
import Template from "../../_components/Template";
import HeaderWrapper from "../../_components/wrapper/Header";
import { CATEGORY_NEW_PAGE_PATHS } from "@/app/utils/paths";
import Header from "../../_components/Header";
import ContentWrapper from "../../_components/wrapper/Content";
import FormWrapper from "../../_components/wrapper/Form";
import TextInputSkeleton from "@/app/components/skeleton/input/TextInput";
import TextBoxInputSkeleton from "@/app/components/skeleton/input/TextBoxInput";
import ButtonSkeleton from "@/app/components/skeleton/Button";


const LoadingCategoryNewPage = () => {
    return (
        <Template>
            <HeaderWrapper>
                <div className='space-y-2'>
                    <PathNavigation paths={CATEGORY_NEW_PAGE_PATHS} />
                    <Header 
                        title='Rediger kategori'
                        description='Rediger en eksisterende kategori'
                    />
                </div>
            </HeaderWrapper>

            <ContentWrapper>
                <FormWrapper>
                    <div className='max-w-xl w-full mx-auto space-y-6'>
                        <TextInputSkeleton />
                        <TextBoxInputSkeleton />
                        <ButtonSkeleton />
                    </div>
                </FormWrapper>
            </ContentWrapper>
        </Template>
    );
};


export default LoadingCategoryNewPage;