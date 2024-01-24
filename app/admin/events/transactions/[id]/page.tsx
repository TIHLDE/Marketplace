import Header from "@/app/admin/_components/Header";
import Template from "@/app/admin/_components/Template";
import HeaderWrapper from "@/app/admin/_components/wrapper/Header";
import PathNavigation from "@/app/components/links/PathNavigation";
import { getTransaction } from "@/app/tihlde/transactions";
import { getEventTransactionPagePaths } from "@/app/utils/paths";
import { notFound } from "next/navigation";
import DeletePayment from "./_components/DeletePayment";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { convertTransactionStatus } from "@/lib/utils";
import { Button } from "@/components/ui/button";


interface TransactionProps {
    params: { id: string };
};

const EventsTransactionPage = async ({ params }: TransactionProps) => {
    const transaction = await getTransaction(params.id);

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
                <DeletePayment order_id={transaction.order_id} />
            </HeaderWrapper>

            <div className='flex justify-between'>
                <Card className='max-w-lg w-full'>
                    <CardHeader className='flex flex-row items-center justify-between'>
                        <CardTitle>
                            {transaction.event.title}
                        </CardTitle>
                        <h1>
                            Status: {convertTransactionStatus(transaction.status)}
                        </h1>
                    </CardHeader>
                    <CardContent className='space-y-2'>
                        <img 
                            className='mx-auto rounded-xl'
                            src={transaction.event.image ? transaction.event.image : '/TihldeBackground.jpg'}
                            alt='Bilde av arrangementet'
                        />
                        <div>
                            <h1>
                                <span className='font-semibold'>Startdato:</span> {new Date(transaction.event.start_date).toLocaleTimeString()} {new Date(transaction.event.start_date).toLocaleDateString()}
                            </h1>
                            <h1>
                                <span className='font-semibold'>Sluttdato:</span> {new Date(transaction.event.end_date).toLocaleTimeString()} {new Date(transaction.event.end_date).toLocaleDateString()}
                            </h1>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>
                            Gå til arrangement
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </Template>
    );
};


export default EventsTransactionPage;