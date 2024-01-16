'use client';

import { TransactionLog } from "@/app/api/vipps/[id]/route";
import VippsButton from "@/app/components/buttons/Vipps";
import OrderStatus from "@/app/orders/products/_components/OrderStatus";
import cn from "@/app/utils/cn";
import axios from "axios";
import { ClassValue } from "clsx";
import { useState } from "react";
import { toast } from "react-toastify";


interface TransactionHistoryProps {
    id: string;
    className?: ClassValue
};

const TransactionHistory = ({ id, className }: TransactionHistoryProps) => {
    const [transactions, setTransactions] = useState<TransactionLog[]>([]);
    const [isLoading, setLoading] = useState<boolean>(false);


    const getTransactionLog = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/vipps/${id}`);
            setTransactions(response.data as TransactionLog[]);
            toast.success('Transaksjonshistorikk hentet');
        } catch (e) {
            const error = e as Error;
            toast.error(error.message);
        } finally {
            setLoading(false);
        }

    };
    
    return (
        <div className={cn(`w-full space-y-6`, className)}>
            <div className='flex items-center justify-between pb-4 border-b border-b-gray-300'>
                <h1 className='font-semibold text-xl'>
                    Transaksjonshistorie
                </h1>

                <VippsButton 
                    idleText='Hent'
                    loadingText='Henter...'
                    isLoading={isLoading}
                    disabled={isLoading}
                    onClick={getTransactionLog}
                    className='py-2 w-40'
                />
            </div>

            <div className='space-y-2'>
                {!transactions.length && (
                    <div className='px-20 pt-12'>
                        <h1 className='text-center text-lg'>
                            Her kan du hente ut transaksjonshistorikk direkte fra VIPPS
                        </h1>
                    </div>
                )}

                {transactions.map((transaction, index) => (
                    <div
                        key={index}
                        className='border border-gray-300 rounded-md p-4'
                    >
                        <div className='flex items-center justify-between'>
                            <OrderStatus status={transaction.operation} />
                            <h1 className='font-semibold'>
                                {new Date(transaction.timeStamp).toLocaleString('nb-NO')}
                            </h1>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default TransactionHistory;