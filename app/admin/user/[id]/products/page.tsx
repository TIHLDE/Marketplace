import Empty from "@/app/admin/_components/Empty";
import Header from "@/app/admin/_components/Header";
import Template from "@/app/admin/_components/Template";
import HeaderWrapper from "@/app/admin/_components/wrapper/Header";
import ProductTransactionTable from "@/app/admin/stats/products/transactions/TransactionTable";
import UnderConstruction from "@/app/components/UnderConstructions";
import PathNavigation from "@/app/components/links/PathNavigation";
import { getUserProductTransactions } from "@/app/db/paymentOrder";
import { getUser } from "@/app/db/user";
import { getUserProductTransactionsPagePaths } from "@/app/utils/paths";
import { notFound } from "next/navigation";


interface TransactionQuery {
    page: string;
};

interface UserProps {
    params: { id: string };
    searchParams: TransactionQuery;
};

const UserProductTransactionsPage = async ({ params, searchParams }: UserProps) => {
    return <UnderConstruction />;
    const page = parseInt(searchParams.page) || 1;
    const pageSize = 10;

    const user = await getUser(params.id);

    if (!user) notFound();

    const transactions = await getUserProductTransactions(
        user.id,
        (page - 1) * pageSize,
        pageSize
    );

    return (
        <Template>
            <HeaderWrapper>
                <div className='space-y-2'>
                    <PathNavigation paths={getUserProductTransactionsPagePaths(user.id)} />
                    <Header
                        title={user.name}
                        description='Oversikt over alle transaksjoner relatert til produkter'
                    />
                </div>
            </HeaderWrapper>

            { !transactions.length
                ? <Empty text='Fant ingen transaksjoner' />
                : <ProductTransactionTable transactions={transactions} />
            }
        </Template>
    );
};


export default UserProductTransactionsPage;