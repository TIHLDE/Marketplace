import { Session } from "next-auth";

import getFallbackName from "@/app/functions/getFallbackName";

interface AvatarButtonProps {
    session: Session | null;
    openMenu: () => void;
};

interface AvatarProps {
    name: string;
    url?: string | null;
};

const Avatar = ({ name, url }: AvatarProps) => {
    if (url) return (
        <img 
            className='w-10 h-10 object-cover rounded-full'
            src={url}
        />
    );
    
    return (
        <div className='inline-flex items-center justify-center w-10 h-10 bg-tihlde-300 rounded-full'>
            <h1 className='text-tihlde-700 font-semibold uppercase'>
                { getFallbackName(name) }
            </h1>
        </div>
    );
};

export const AvatarButton = ({ session, openMenu }: AvatarButtonProps) => {
    return (
        <button
            onClick={openMenu}
        >
            <Avatar name={session!.user!.name!} url={session?.user?.image} />
        </button>
    );
};

export const AvatarSkeleton = () => {
    return (
        <div className='w-10 h-10 bg-gray-200 rounded-full animate-pulse flex items-center justify-center'>
            <svg className='w-8 h-8 text-gray-100' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 20 20'>
                <path d='M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z'/>
            </svg>
        </div>
    );
};


export default Avatar;