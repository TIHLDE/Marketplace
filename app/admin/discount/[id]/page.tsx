import { notFound } from "next/navigation";
import Template from "../../_components/Template";
import Header from "../../_components/Header";
import DiscountForm from "../DiscountForm";
import { getDiscounts } from "@/app/db/discount";
import PathNavigation from "@/app/components/links/PathNavigation";
import { getDiscountEditPagePaths } from "@/app/utils/paths";
import HeaderWrapper from "../../_components/wrapper/Header";
import ContentWrapper from "../../_components/wrapper/Content";
import FormWrapper from "../../_components/wrapper/Form";
import UnderConstruction from "@/app/components/UnderConstructions";


interface EditDiscountProps {
    params: { id: string }
};

const EditDiscount = async ({ params }: EditDiscountProps) => {
    return <UnderConstruction />;
    const discounts = await getDiscounts(true);

    const discount = discounts.find(discount => discount.id === params.id);

    if (!discount) notFound();

    return (
        <Template>
            <HeaderWrapper>
                    <div className='space-y-2'>
                        <PathNavigation paths={getDiscountEditPagePaths(discount.id)} />
                        <Header 
                            title='Rediger rabatt'
                            description='Rediger en eksisterende rabatt'
                        />
                    </div>
                    {/* <DeleteCategory id={category.id} />  */}
            </HeaderWrapper>

            <ContentWrapper>
                <FormWrapper>
                    <DiscountForm discount={discount} />
                </FormWrapper>
            </ContentWrapper>
        </Template>
    );

};


export default EditDiscount;