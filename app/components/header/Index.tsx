'use client';

import { useSession } from "next-auth/react";
import Link from "next/link";
import Cart from "./Cart";
import Menu from "./Menu";
import { AvatarSkeleton } from "./Avatar";


const Header = () => {
    const { status, data: session } = useSession();

    return (
        <header className='flex items-center space-x-6'>
            { status === 'authenticated' && <Cart /> }

            <div>
                { status === 'loading' && <AvatarSkeleton /> }
                { status === 'unauthenticated' && (
                    <Link
                        className='text-sm font-medium text-tihlde-500 underline hover:text-tihlde-700' 
                        href='/api/auth/signin'
                    >
                        Logg inn
                    </Link>
                )}
                { status === 'authenticated' && <Menu session={session} /> }
            </div>
        </header>
    );
}


export default Header;