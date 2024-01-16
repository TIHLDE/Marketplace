import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";


const TableCell = ({ text }: { text: string }) => {
    return (
        <td className='px-6 py-4'>
            { text }
        </td>
    );
};

export const TableCellEdit = ({ href }: { href: string }) => {
    return (
        <td className='px-6 py-4'>
            <Link
                href={href}
            >
                <Pencil2Icon className='w-5 h-5 text-tihlde hover:text-gray-300' />
            </Link>
        </td>
    );
};


export default TableCell;