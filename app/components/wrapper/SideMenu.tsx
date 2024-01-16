import cn from "@/app/utils/cn";
import { Cross2Icon } from "@radix-ui/react-icons";
import { ClassValue } from "clsx";
import React, { useEffect, useRef } from "react";


interface SideMenuWrapperProps extends React.PropsWithChildren {
    close: () => void;
    className?: ClassValue;
};

const SideMenuWrapper = ({ children, close, className }: SideMenuWrapperProps) => {
    const menuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                close();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuRef]);
    
    return (
        <div
            ref={menuRef}
            className={cn('fixed right-0 top-0 h-screen max-w-md w-full border-l border-gray-300 shadow-md bg-white z-20 transition duration-150 animate-slidein', className)}
        >
            <button
                onClick={close}
                className='group absolute top-2 right-2 p-1 rounded-lg bg-gray-100 border border-gray-300 hover:bg-gray-900 hover:border-gray-900 transition duration-150 ease-in-out'
            >
                <Cross2Icon className='group-hover:text-white' />
            </button>
            { children }
        </div>
    );
};


export default SideMenuWrapper;