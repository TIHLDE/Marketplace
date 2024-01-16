import PathNavigation from "@/app/components/links/PathNavigation";
import Header from "../../_components/Header";
import Template from "../../_components/Template";
import { ADMIN_PROUDCTSTATS_PAGE_PATHS } from "@/app/utils/paths";
import { getTotalMonthlyOrders, getTotalMonthlyProducts, getTotalMonthlyRevenue } from "@/app/db/paymentOrder";
import StatNumberCard from "../_components/StatNumberCard";
import vippsFee from "../utils/vippsFee";
import LatestTransactions from "../_components/LatestTransactions";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";


const ProductStatsPage = async () => {
    const totalOrders = await getTotalMonthlyOrders(2023, 12);
    const totalProducts = await getTotalMonthlyProducts(2023, 12);
    const totalRevenue = await getTotalMonthlyRevenue(2023, 12);

    return (
        <Template>
            <div className='flex items-center justify-between pb-6'>
                <div className='space-y-2'>
                    <PathNavigation paths={ADMIN_PROUDCTSTATS_PAGE_PATHS} />
                    <Header 
                        title='Produktstatistikk'
                        description='Oversikt over alle solgte produkter'
                    />
                </div>

                <div className='flex items-center space-x-2'>
                    <button>
                        <ChevronLeftIcon className='w-6 h-6 text-gray-500' />
                    </button>
                    <h1>
                        Desember, 2023
                    </h1>
                    <button>
                        <ChevronRightIcon className='w-6 h-6 text-gray-500' />
                    </button>
                </div>
            </div>

            <div className='grid grid-cols-4 gap-6 pb-8'>
                <StatNumberCard
                    title='Totalt antall ordre'
                    number={totalOrders}
                />
                <StatNumberCard
                    title='Totalt antall produkter'
                    number={totalProducts}
                />
                <StatNumberCard
                    title='Totale inntekter'
                    number={totalRevenue}
                    isAmount
                />
                <StatNumberCard 
                    title='Totale VIPPS avgifter'
                    number={vippsFee(totalRevenue,  totalOrders)}
                    isAmount
                />
            </div>

            <LatestTransactions />

        </Template>
    );
};


export default ProductStatsPage;