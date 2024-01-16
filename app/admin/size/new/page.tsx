import Template from "../../_components/Template";
import Header from "../../_components/Header";
import SizeForm from "../SizeForm";
import HeaderWrapper from '../../_components/wrapper/Header';
import PathNavigation from '@/app/components/links/PathNavigation';
import { SIZE_NEW_PAGE_PATHS } from '@/app/utils/paths';
import ContentWrapper from '../../_components/wrapper/Content';
import FormWrapper from '../../_components/wrapper/Form';


const NewSize = async () => {
    return (
        <Template>
            <HeaderWrapper>
                <div className='space-y-2'>
                    <PathNavigation paths={SIZE_NEW_PAGE_PATHS} />
                    <Header 
                        title='Størrelser'
                        description='Administrer størrelser'
                    />
                </div>
            </HeaderWrapper>

            <ContentWrapper>
                <FormWrapper>
                    <SizeForm />
                </FormWrapper>
            </ContentWrapper>
        </Template>
    );
};


export default NewSize;