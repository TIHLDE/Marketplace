import PathNavigation from "@/app/components/links/PathNavigation";
import Template from "../../_components/Template";
import HeaderWrapper from "../../_components/wrapper/Header";
import { SIZE_EDIT_PAGE_PATHS } from "@/app/utils/paths";
import Header from "../../_components/Header";
import ContentWrapper from "../../_components/wrapper/Content";
import FormWrapper from "../../_components/wrapper/Form";
import TextInputSkeleton from "@/app/components/skeleton/input/TextInput";
import ButtonSkeleton from "@/app/components/skeleton/Button";


const LoadingSizeEditPage = () => {
    return (
        <Template>
            <HeaderWrapper>
                <div className='space-y-2'>
                    <PathNavigation paths={SIZE_EDIT_PAGE_PATHS} />
                    <Header 
                        title='Rediger størrelse'
                        description='Rediger en eksisterende størrelse'
                    />
                </div>
            </HeaderWrapper>

            <ContentWrapper>
                <FormWrapper>
                    <div className='max-w-xl w-full mx-auto space-y-6'>
                        <TextInputSkeleton />
                        <TextInputSkeleton />
                        <ButtonSkeleton />
                    </div>
                </FormWrapper>
            </ContentWrapper>
        </Template>
    );
};


export default LoadingSizeEditPage;