'use client';

import {
    HomeIcon,
    BookmarkIcon,
    PersonIcon,
    LightningBoltIcon,
    RocketIcon,
    DimensionsIcon
} from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

import * as HoverCard from '@radix-ui/react-hover-card';


const AdminLayout = ({ children }: { children: React.ReactNode } ) => {
    // const links = [
    //     {
    //         label: 'Dashboard',
    //         href: '/admin',
    //         icon: <HomeIcon />,
    //         children: []
    //     },
    //     {
    //         label: 'Produkter',
    //         href: '/admin/product',
    //         icon: <LightningBoltIcon />,
    //         children: [
    //             {
    //                 label: 'Alle produkter',
    //                 description: 'Oversikt over alle produkter, og mulighet for å opprette og redigere produkter.',
    //                 href: '/admin/product'
    //             },
    //             {
    //                 label: 'Produktkategorier',
    //                 description: 'Oversikt over alle kategorier, og mulighet for å opprette og redigere kategorier.',
    //                 href: '/admin/category'
    //             },
    //             {
    //                 label: 'Produktstørrelser',
    //                 description: 'Overiskt over alle størrelser, og mulighet for å opprette og redigere størrelser.',
    //                 href: '/admin/size'
    //             },
    //             {
    //                 label: 'Produktrabatter',
    //                 description: 'Overiskt over alle rabatter, og mulighet for å opprette og redigere rabatter.',
    //                 href: '/admin/discount'
    //             }
    //         ]
    //     },
    //     {
    //         label: 'Brukere',
    //         href: '/admin/user',
    //         icon: <PersonIcon />,
    //         children: []
    //     }
    // ];

    const links = [
        {
            label: 'Oversikt',
            href: '/admin',
            icon: <HomeIcon />
        },
        {
            label: 'Produkter',
            href: '/admin/product',
            icon: <LightningBoltIcon />
        },
        {
            label: 'Kategorier',
            href: '/admin/category',
            icon: <BookmarkIcon />
        },
        {
            label: 'Størrelser',
            href: '/admin/size',
            icon: <DimensionsIcon />
        },
        {
            label: 'Rabatter',
            href: '/admin/discount',
            icon: <RocketIcon />
        },
        {
            label: 'Brukere',
            href: '/admin/user',
            icon: <PersonIcon />
        }
    ];

    return (
        <div className='max-w-8xl w-full flex min-h-screen relative'>
            <div className='w-60 px-12'>
                <div className='py-24'>
                    <div className='fixed px-2 border border-gray-300 py-3 rounded-md'>
                        <div className='space-y-4'>
                            {links.map((link, index) => (
                                <LinkItem 
                                    key={index}
                                    linkItem={link}
                                />
                            ))}

                        </div>
                    </div>
                </div>
            </div>
            { children }
        </div>
    );  
};

interface LinkItem {
    label: string;
    href: string;
    icon: React.ReactNode;
};

interface LinkChild {
    label: string;
    description: string;
    href: string;
};

interface LinkItemMenuProps {
    linkItem: LinkItem;
    children: LinkChild[];
};

const LinkItem = ({ linkItem }: { linkItem: LinkItem }) => {
    const path = usePathname();

    return (
        <Link 
            href={linkItem.href}
            className={`${path === linkItem.href ? 'bg-gray-100' : 'bg-white hover:bg-gray-100'} flex items-center space-x-2 cursor-pointer px-4 py-2 rounded-md`}
        >
            { linkItem.icon }
            <h1>
                { linkItem.label }
            </h1>
        </Link>
    );
};

const LinkItemMenu = ({ linkItem, children }: LinkItemMenuProps) => {
    const path = usePathname();

    if (!children.length) {
        return (
            <Link 
                href={linkItem.href}
                className={`${path === linkItem.href ? 'bg-gray-100' : 'bg-white hover:bg-gray-100'} flex items-center space-x-2 cursor-pointer px-4 py-2 rounded-md`}
            >
                { linkItem.icon }
                <h1>
                    { linkItem.label }
                </h1>
            </Link>
        );
    }

    return (
        <HoverCard.Root>
            <HoverCard.Trigger 
                className={`${path === linkItem.href || children.find(c => path === c.href) ? 'bg-gray-100' : 'bg-white hover:bg-gray-100'} flex items-center space-x-2 cursor-pointer px-4 py-2 rounded-md`}
            >
                { linkItem.icon }
                <h1>
                    { linkItem.label }
                </h1>
            </HoverCard.Trigger>

            <HoverCard.Portal>
                <HoverCard.Content
                    className='rounded-md p-5 bg-white shadow-md border border-gray-200 grid gap-4 grid-cols-2'
                    sideOffset={5}
                >
                    {children.map((child, index) => (
                        <Link
                            key={index}
                            href={child.href}
                            className='space-y-1 px-3 py-2 rounded-md hover:bg-gray-100 w-52'
                        >
                            <h1 className='font-semibold'>
                                { child.label }
                            </h1>
                            <p className='text-sm text-gray-500'>
                                { child.description }
                            </p>
                        </Link>
                    ))}
                </HoverCard.Content>
            </HoverCard.Portal>
        </HoverCard.Root>
    );
};

export default AdminLayout;