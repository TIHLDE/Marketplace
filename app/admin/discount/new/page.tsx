import Header from "../../_components/Header";
import Template from "../../_components/Template";
import DiscountForm from "../DiscountForm";
import { getDiscounts } from "@/app/db/discount";
import PathNavigation from "@/app/components/links/PathNavigation";
import { DISCOUNT_NEW_PAGE_PATHS } from "@/app/utils/paths";
import HeaderWrapper from "../../_components/wrapper/Header";
import ContentWrapper from "../../_components/wrapper/Content";
import FormWrapper from "../../_components/wrapper/Form";
import UnderConstruction from "@/app/components/UnderConstructions";


const NewDiscount = async () => {
    return <UnderConstruction />;
    const discounts = await getDiscounts(true);

    return (
        <Template>
            <HeaderWrapper>
                <div className='space-y-2'>
                    <PathNavigation paths={DISCOUNT_NEW_PAGE_PATHS} />
                    <Header 
                        title='Rabatter'
                        description='Administrer rabatter'
                    />
                </div>
            </HeaderWrapper>

            <ContentWrapper>
                <FormWrapper>
                    <DiscountForm />
                </FormWrapper>
            </ContentWrapper>
        </Template>
    );
};


export default NewDiscount;