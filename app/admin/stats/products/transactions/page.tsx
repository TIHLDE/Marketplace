import Empty from "@/app/admin/_components/Empty";
import Header from "@/app/admin/_components/Header";
import Template from "@/app/admin/_components/Template";
import PathNavigation from "@/app/components/links/PathNavigation";
import { ADMIN_PRDUCT_TRANSACTIONS_PAGE_PATHS } from "@/app/utils/paths";
import ProductTransactionTable from "./TransactionTable";
import HeaderWrapper from "@/app/admin/_components/wrapper/Header";
import { getOrderCount, getOrders } from "@/app/db/paymentOrder";
import Pagination from "@/app/components/Pagination";
import Search from "@/app/components/Search";


interface TransactionQuery {
    page: string;
    search: string;
};

interface ProductTransactionsProps {
    searchParams: TransactionQuery;
};

const ProductTransactionsPage = async ({ searchParams }: ProductTransactionsProps) => {
    const page = parseInt(searchParams.page) || 1;
    const pageSize = 10;

    const search = searchParams.search || '';

    const transactions = await getOrders(
        (page - 1) * pageSize,
        pageSize,
        search
    );

    const transactionCount = await getOrderCount(search);

    return (
        <Template>
            <HeaderWrapper>
                <div className='space-y-2'>
                    <PathNavigation paths={ADMIN_PRDUCT_TRANSACTIONS_PAGE_PATHS} />
                    <Header
                        title='Transaksjoner'
                        description='Administrer transaksjoner for produkter'
                    />
                </div>
            </HeaderWrapper>

            <div className='flex items-center space-x-6 pb-4 justify-between'>
                { (transactions.length > 0 || search.length > 0) && <Search />  }
                <Pagination 
                    currentPage={page}
                    pageSize={pageSize}
                    itemCount={transactionCount}
                />
            </div>

            { !transactions.length
                ? <Empty text='Fant ingen transaksjoner' />
                : <ProductTransactionTable transactions={transactions} />
            }
        </Template>
    );
};


export default ProductTransactionsPage;