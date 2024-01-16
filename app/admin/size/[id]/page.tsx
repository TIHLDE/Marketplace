import { notFound } from "next/navigation";

import Template from "../../_components/Template";
import Header from "../../_components/Header";
import SizeForm from "../SizeForm";
import { getSize } from "@/app/db/size";
import HeaderWrapper from "../../_components/wrapper/Header";
import PathNavigation from "@/app/components/links/PathNavigation";
import { getSizeEditPagePaths } from "@/app/utils/paths";
import ContentWrapper from "../../_components/wrapper/Content";
import FormWrapper from "../../_components/wrapper/Form";


interface EditSizeProps {
    params: { id: string }
};

const EditSize = async ({ params }: EditSizeProps) => {
    const size = await getSize(params.id);

    if (!size) notFound();

    return (
        <Template>
            <HeaderWrapper>
                <div className='space-y-2'>
                    <PathNavigation paths={getSizeEditPagePaths(size.id)} />
                    <Header 
                        title='Rediger størrelse'
                        description='Rediger en eksisterende størrelse'
                    />
                </div>
            </HeaderWrapper>

            <ContentWrapper>
                <FormWrapper>
                    <SizeForm size={size} />
                </FormWrapper>
            </ContentWrapper>
        </Template>
    );
};


export default EditSize;