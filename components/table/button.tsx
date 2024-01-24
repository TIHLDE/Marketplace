'use client';

import { cn } from "@/lib/utils";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";


const TableHeadSort = ({
    children,
    query,
    className
}: React.PropsWithChildren<{ query: string, className?: string }>) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [descending, setDescending] = useState<boolean>(true);

    const handleOrder = () => {
        const isDescending = !descending;
        const params = new URLSearchParams(searchParams.toString());
        params.set(
            'ordering',
            isDescending ? `-${query}` : query
        );
        setDescending(isDescending);
        router.push(`?${params.toString()}`);
    };

    return (
        <Button 
            variant='ghost'
            onClick={handleOrder}
            className={cn('flex items-center space-x-2', className)}
        >
            <h1>
                { children }
            </h1>
            { descending
                ? <ArrowUpIcon className='w-4 h-4' />
                : <ArrowDownIcon className='w-4 h-4' />
            }
        </Button>
    );
};


export {
    TableHeadSort
}