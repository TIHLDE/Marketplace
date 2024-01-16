'use client';

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { DotsHorizontalIcon, Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";

import Link from "next/link";


interface EditDropdownMenuProps {
    editUrl: string;
    deleteUrl: string;
};

const EditDropdownMenu = ({ editUrl, deleteUrl }: EditDropdownMenuProps) => {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <DotsHorizontalIcon className='w-6 h-6 cursor-pointer hover:text-gray-300' />
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    className='bg-white shadow-md px-1 py-2 border border-gray-200 rounded-md space-y-2'
                    sideOffset={5}
                >
                    <DropdownItem 
                        text='Rediger'
                        href={editUrl}
                        icon={<Pencil2Icon />}
                    />

                    <DropdownItem 
                        text='Slett'
                        href={deleteUrl}
                        icon={<TrashIcon />}
                    />
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
    </DropdownMenu.Root>
    );
};

interface DropdownItemProps {
    text: string;
    href: string;
    icon: React.ReactNode;
};

const DropdownItem = ({ text, href, icon }: DropdownItemProps) => {
    return (
        <DropdownMenu.Item className='outline-none rounded-md text-gray-500 px-4 py-1 hover:text-gray-900 hover:bg-gray-100'>
            <Link 
                href={href}
                className='flex items-center space-x-2 w-full'
            >
                { icon }
                <h1>
                    { text }
                </h1>
            </Link>
        </DropdownMenu.Item>
    );
};


export default EditDropdownMenu;