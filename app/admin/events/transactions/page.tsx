import PathNavigation from "@/app/components/links/PathNavigation";
import Template from "../../_components/Template";
import HeaderWrapper from "../../_components/wrapper/Header";
import { ADMIN_EVENTS_TRANSACTIONS_PATHS } from "@/app/utils/paths";
import Header from "../../_components/Header";
import TransactionsTable from "./TransactionsTable";
import { getTransactions } from "@/app/tihlde/transactions";
import { TableQueryWrapper } from "@/components/table";
import { QueryReset, QuerySelect, SearchBar } from "@/components/search";
import Empty from "../../_components/Empty";
import { Pagination } from "@/components/pagination";
import { paymentStatusValues } from "@/lib/utils";


interface TransactionsQuery {
    page: string;
    search: string;
    ordering: string;
    status: string;
};

interface TransactionsPageProps {
    searchParams: TransactionsQuery;
};

const EventsTransactionsPage = async ({ searchParams }: TransactionsPageProps) => {
    const page = parseInt(searchParams.page) || 1;
    const pageSize = 25;

    const search = searchParams.search || '';
    const ordering = searchParams.ordering || '';
    const status = searchParams.status || '';

    const transactions = await getTransactions(
        page,
        search,
        ordering,
        status
    );

    return (
        <Template>
            <HeaderWrapper>
                <div className='space-y-2'>
                    <PathNavigation paths={ADMIN_EVENTS_TRANSACTIONS_PATHS} />
                    <Header 
                        title='Transaksjoner'
                        description='Her kan du se alle transaksjoner for arrangementer'
                    />
                </div>
            </HeaderWrapper>

            <TableQueryWrapper>
                <div className='flex items-center space-x-2'>
                    <SearchBar />
                    <QuerySelect 
                        query='status'
                        placeholder='Status'
                        options={paymentStatusValues}
                    />
                    <QueryReset />
                </div>
                <Pagination 
                    pageSize={pageSize}
                    currentPage={page}
                    itemCount={transactions.count}
                />
            </TableQueryWrapper>

            { !transactions.results.length
                ? <Empty text='Fant ingen transaksjoner' className='mt-12' />
                : <TransactionsTable transactions={transactions.results} />
            }
        </Template>
    );
};

export default EventsTransactionsPage;