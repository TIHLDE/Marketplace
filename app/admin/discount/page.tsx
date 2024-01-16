import Empty from "../_components/Empty";
import Template from "../_components/Template";
import Header from "../_components/Header";
import NewLink from "@/app/components/links/New";
import DiscountTable from "./DiscountTable";
import { getDiscounts } from "@/app/db/discount";
import PathNavigation from "@/app/components/links/PathNavigation";
import { DISCOUNT_PAGE_PATHS } from "@/app/utils/paths";
import HeaderWrapper from "../_components/wrapper/Header";
import UnderConstruction from "@/app/components/UnderConstructions";


const Discount = async () => {
    return <UnderConstruction />;
    const discounts = await getDiscounts(true);

    return (
        <Template>
            <HeaderWrapper>
                <div className='space-y-2'>
                    <PathNavigation paths={DISCOUNT_PAGE_PATHS} />
                    <Header 
                        title='Rabatter'
                        description='Administrer rabatter'
                    />
                </div>
                <NewLink 
                    href='/admin/discount/new'
                    title='Ny rabatt'
                />
            </HeaderWrapper>

            { !discounts.length 
                ? <Empty text='Fant ingen rabatter' /> 
                : <DiscountTable discounts={discounts} />
            }

        </Template>
    );
};


export default Discount;