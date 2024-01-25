import Header from "@/app/admin/_components/Header";
import Template from "@/app/admin/_components/Template";
import HeaderWrapper from "@/app/admin/_components/wrapper/Header";
import PathNavigation from "@/app/components/links/PathNavigation";
import { getTransaction } from "@/app/tihlde/transactions";
import { getEventTransactionPagePaths } from "@/app/utils/paths";
import { notFound } from "next/navigation";
import DeletePayment from "./_components/DeletePayment";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import hasAccess from "@/app/api/middleware/auth";
import { superAdminRoles } from "@/app/enums/role";
import EventCard from "./_components/EventCard";
import TransactionCard from "./_components/TransactionCard";


interface TransactionProps {
    params: { id: string };
};

const EventsTransactionPage = async ({ params }: TransactionProps) => {
    const transaction = await getTransaction(params.id);
    const session = await getServerSession(authOptions);

    if (!transaction) notFound();

    return (
        <Template>
            <HeaderWrapper>
                <div className='space-y-2'>
                    <PathNavigation paths={getEventTransactionPagePaths(
                        transaction.user.first_name,
                        transaction.order_id
                    )} />
                    <Header
                        title={`${transaction.user.first_name} ${transaction.user.last_name}`}
                        description={`Ordre ID: ${transaction.order_id}`}
                    />
                </div>
                { hasAccess(session!.role, superAdminRoles) && <DeletePayment order_id={transaction.order_id} /> }
            </HeaderWrapper>

            <div className='flex justify-between space-x-8'>
                <EventCard status={transaction.status} event={transaction.event} />
                <TransactionCard orderId={transaction.order_id} />
            </div>
        </Template>
    );
};


export default EventsTransactionPage;