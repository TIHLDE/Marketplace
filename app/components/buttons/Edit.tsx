import Link from "next/link";

import { Pencil2Icon } from "@radix-ui/react-icons";


interface EditButtonProps {
    name: string,
    href: string
};

const EditButton = ({ name, href }: EditButtonProps) => {
    return (
        <Link
            href={href}
            className='px-2 py-1 flex items-center space-x-2 bg-indigo-200 text-indigo-900 rounded-md border border-indigo-200 hover:border-indigo-900'
        >   
            <Pencil2Icon />
            <h1>
                { name }
            </h1>
        </Link>
    );
};


export default EditButton;