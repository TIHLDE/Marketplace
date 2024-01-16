import PathNavigation from "@/app/components/links/PathNavigation";
import Template from "../../_components/Template";
import HeaderWrapper from "../../_components/wrapper/Header";
import Header from "../../_components/Header";
import { SIZE_NEW_PAGE_PATHS } from "@/app/utils/paths";
import ContentWrapper from "../../_components/wrapper/Content";
import FormWrapper from "../../_components/wrapper/Form";
import TextInputSkeleton from "@/app/components/skeleton/input/TextInput";
import ButtonSkeleton from "@/app/components/skeleton/Button";


const LoadingNewSizePage = () => {
    return (
        <Template>
            <HeaderWrapper>
                <div className='space-y-2'>
                    <PathNavigation paths={SIZE_NEW_PAGE_PATHS} />
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


export default LoadingNewSizePage;