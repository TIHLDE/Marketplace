import { Session } from "next-auth";


import Link from "next/link";
import Role from "@/app/enums/role";

import { RocketIcon, MixIcon, BellIcon, ReaderIcon, HeartIcon, CubeIcon, BarChartIcon, QuestionMarkIcon, PlusIcon, ExitIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import Avatar, { AvatarButton } from "./Avatar";
import BackDropBlur from "../ui/BackdropBlur";
import SideMenuWrapper from "../wrapper/SideMenu";
import Separator from "../ui/Separator";
import { signOut } from "next-auth/react";


const Menu = ({ session }: { session: Session | null }) => {
    const [open, setOpen] = useState<boolean>(false);

    const openMenu = () => {
        setOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
        setOpen(false);
        document.body.style.overflow = 'unset';
    };

    return (
        <div>
            <AvatarButton session={session} openMenu={openMenu} />

            { open && (
                <>
                    <BackDropBlur />
                    <SideMenuWrapper
                        className='max-w-xs' 
                        close={closeMenu}
                    >
                        <div className='px-4 py-6'>
                            <div className='flex items-center space-x-2 pb-8'>
                                <Avatar name={session?.user?.name!} url={session?.user?.image!} />
                                <div>
                                    <h1 className='font-semibold capitalize'>
                                        { session?.tihldeId }
                                    </h1>
                                    <p className='text-xs text-gray-500'>
                                        { session?.user?.name }
                                    </p>
                                </div>
                            </div>

                            <div className='pb-2'>
                                <DropdownItem
                                    close={closeMenu}
                                    text='Mine varsler'
                                    href='/me/notifications'
                                    icon={<BellIcon />}
                                />
                            </div>

                            <Separator 
                                orientation='horizontal'
                            />

                            <div className='mt-2 space-y-2 pb-2'>
                                <DropdownItem
                                    close={closeMenu} 
                                    text='Mine betalingsordre'
                                    href='/orders'
                                    icon={<ReaderIcon />}
                                />
                                <DropdownItem
                                    close={closeMenu} 
                                    text='Mine favoritter'
                                    href='/me/products'
                                    icon={<HeartIcon />}
                                />
                            </div>

                            <Separator 
                                orientation='horizontal'
                            />

                            <div className='mt-2 space-y-2 pb-2'>
                                <DropdownItem
                                    close={closeMenu} 
                                    text='Mine arrangementer'
                                    href='/me/events'
                                    icon={<MixIcon />}
                                />
                                <DropdownItem
                                    close={closeMenu} 
                                    text='Mine forespørsler'
                                    href='/me/requests'
                                    icon={<QuestionMarkIcon />}
                                />
                            </div>

                            <Separator 
                                orientation='horizontal'
                            />

                            { 
                                session?.role === Role.ADMIN || session?.role === Role.SUPERADMIN && (
                                    <>
                                        <div className='mt-2 space-y-2 pb-2'>
                                            <DropdownItem
                                                close={closeMenu} 
                                                text='Adminpanel'
                                                href='/admin'
                                                icon={<BarChartIcon />}
                                            />
                                            <DropdownItem
                                                close={closeMenu} 
                                                text='Produkter'
                                                href='/admin/product'
                                                icon={<CubeIcon />}
                                            />
                                            <DropdownItem
                                                close={closeMenu} 
                                                text='Nytt produkt'
                                                href='/admin/product/new'
                                                icon={<PlusIcon />}
                                            />
                                        </div>
                                    </>
                                )
                            }

                            <Separator 
                                orientation='horizontal'
                            />

                            <div
                                className='mt-2 space-y-2 pb-2'
                            >
                                <LogOut />
                            </div>
                        </div>
                    </SideMenuWrapper>
                </>
            )}
        </div>
    );
};

interface DropdownItemProps {
    text: string;
    href: string;
    icon: React.ReactNode;
    close: () => void;
};

const LogOut = () => {
    return (
        <div
            onClick={() => signOut()}
            className='outline-none text-gray-500 px-4 py-2 rounded-md hover:bg-tihlde-50 hover:text-tihlde-700 hover:font-semibold'
        >   
            <button
                className='flex space-x-2 items-center w-full'
            >
                <ExitIcon />
                <h1>
                    Logg ut
                </h1>
            </button>
        </div>
    );
};

const DropdownItem = ({ text, href, icon, close }: DropdownItemProps) => {
    return (
        <div
            onClick={close}
            className='outline-none text-gray-500 px-4 py-2 rounded-md hover:bg-tihlde-50 hover:text-tihlde-700 hover:font-semibold'
        >   
            <Link
                className='flex space-x-2 items-center w-full'
                href={href}
            >
                { icon }
                <h1 className='text-sm'>
                    { text}
                </h1>
            </Link>
        </div>
    );
};

export default Menu;