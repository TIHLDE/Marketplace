import PathNavigation from "@/app/components/links/PathNavigation";
import Template from "../../_components/Template";
import HeaderWrapper from "../../_components/wrapper/Header";
import { ADMIN_EVENTS_TRANSACTIONS_PATHS } from "@/app/utils/paths";
import Header from "../../_components/Header";
import TransactionsTable from "./TransactionsTable";
import { getTransactions } from "@/app/tihlde/transactions";
import { TableQueryWrapper } from "@/components/table";
import { SearchBar } from "@/components/search";
import Empty from "../../_components/Empty";
import { Pagination } from "@/components/pagination";


interface TransactionsQuery {
    page: string;
    search: string;
    ordering: string;
};

interface TransactionsPageProps {
    searchParams: TransactionsQuery;
};

const EventsTransactionsPage = async ({ searchParams }: TransactionsPageProps) => {
    const page = parseInt(searchParams.page) || 1;
    const pageSize = 25;

    const search = searchParams.search || '';
    const ordering = searchParams.ordering || '';

    const transactions = await getTransactions(
        page,
        search,
        ordering
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
                { (transactions.results.length > 0 || search.length > 0) && <SearchBar />}
                <Pagination 
                    pageSize={pageSize}
                    currentPage={page}
                    itemCount={transactions.count}
                />
            </TableQueryWrapper>

            { !transactions.results.length
                ? <Empty text='Fant ingen transaksjoner' />
                : <TransactionsTable transactions={transactions.results} />
            }
        </Template>
    );
};

export default EventsTransactionsPage;