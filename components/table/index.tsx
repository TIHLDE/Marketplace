import { cn } from "@/lib/utils";
import { 
    TableHead as UiTableHead,
    TableCell as UiTableCell 
} from "../ui/table";
import React from "react";
import Link from "next/link";
import { EditIcon } from "lucide-react";


const TableWrapper = ({ 
    children,
    className 
}: React.PropsWithChildren<{ className?: string }>
) => {
    return (
        <div className={cn('relative overflow-x-auto rounded-lg border border-gray-200', className)}>
            { children }
        </div>
    );
};

const TableHead = ({
    children,
    edit,
    className
}: React.PropsWithChildren<{ edit?: boolean, className?: string }>) => {
    return (
        <UiTableHead
            className={cn(className, edit ? 'sr-only' : '')}
        >
            { children }
        </UiTableHead>
    );
}

const TableCell = ({
    children,
    link,
    className
}: React.PropsWithChildren<{ link?: string, className?: string }>) => {
    return (
        <UiTableCell
            className={className}
        >
            { link ? (
                <Link
                    href={link}
                >
                    <EditIcon className='hover:text-gray-300 w-5 h-5 text-emerald-500' />
                </Link>
            ) : (
                children
            )}
        </UiTableCell>
    
    );
};

const TableQueryWrapper = ({
    children,
    className
}: React.PropsWithChildren<{ className?: string }>) => {
    return (
        <div
            className={cn('flex items-center justify-between space-x-6 pb-4', className)}
        >
            { children }
        </div>
    );
};


export {
    TableWrapper,
    TableHead,
    TableCell,
    TableQueryWrapper
}