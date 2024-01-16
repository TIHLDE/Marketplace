import cn from "@/app/utils/cn";
import { ClassValue } from "clsx";


const TableHead = ({ text, className }: { text: string, className?: ClassValue }) => {
    return (
        <th className={cn(`px-6 py-3`, className)}>
            { text }
        </th>
    );
};

export const TableHeadEdit = ({ className }: { className?: ClassValue }) => {
    return (
        <th className={cn(`px-6 py-3`, className)}>
            <span className='sr-only'>
                Rediger
            </span>
        </th>
    );
};


export default TableHead;