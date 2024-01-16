import Link from "next/link";

import { PlusIcon } from "@radix-ui/react-icons";


interface NewLinkProps {
    href: string;
    title: string;
};

const NewLink = ({ href, title }: NewLinkProps) => {
    return (
        <Link
            href={href}
            className='flex items-center space-x-1 px-4 py-2 rounded-md bg-caribbean-600 text-white hover:bg-caribbean-700 transition duration-150 ease-in-out font-semibold'
        >
            <PlusIcon />
            <h1>
                { title }
            </h1>
        </Link>
    );
};


export default NewLink;