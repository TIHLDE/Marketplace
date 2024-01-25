'use client';

import { TransactionLog, getTransactionLog } from "@/app/actions/vipps/get-transactionLog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { convertTransactionStatus } from "@/lib/utils";
import { useState } from "react";
import { toast } from "react-toastify";
import UpdatePayment from "./UpdatePayment";
import { LoadingSpinner } from "@/components/ui/loading-spinner";


interface TransactionCardProps {
    orderId: string;
};

const TransactionCard = ({ orderId }: TransactionCardProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [transactionLog, setTransactionLog] = useState<TransactionLog[]>([]);


    const handleGetLog = async () => {
        setLoading(true);
        
        try {
            const data: TransactionLog[] = await getTransactionLog(orderId);
            setTransactionLog(data);
        } catch (e) {
            const error = e as Error;
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card
            className='w-full'
        >
            <CardHeader>
                <CardTitle>
                    Transaksjonslogg
                </CardTitle>
                <CardDescription>
                    Hent transaksjonslogg fra Vipps og oppdater ordre til reell status.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className='flex items-center space-x-2'>
                    <Button
                        disabled={loading || transactionLog.length > 0}
                        onClick={handleGetLog}
                    >
                        Hent logg
                    </Button>
                    <UpdatePayment orderId={orderId} />
                </div>

                <Separator className='my-4' />

                <ScrollArea className='w-full'>
                    { loading && <LoadingSpinner className='mx-auto my-20' />}
                    { !loading && transactionLog.map((log, index) => (
                        <>
                            <div
                                key={index}
                                className='flex items-center justify-between'
                            >
                                <h1>
                                    <span className='font-semibold'>Tidspunkt:</span> {new Date(log.timeStamp).toLocaleTimeString()} {new Date(log.timeStamp).toLocaleDateString()}
                                </h1>
                                <h1>
                                    <span className='font-semibold'>Status:</span> { convertTransactionStatus(log.operation) }
                                </h1>
                            </div>
                            { index !== transactionLog.length - 1 && <Separator className='my-3' />}
                        </>
                    )) }
                </ScrollArea>
            </CardContent>
        </Card>
    );
};


export default TransactionCard;