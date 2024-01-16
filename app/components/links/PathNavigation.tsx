'use client';

import { PathProps } from "@/app/utils/paths";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";


interface PathNavigationProps {
    paths: PathProps[];
};

const PathNavigation = ({ paths }: PathNavigationProps) => {
    return (
        <div className='flex items-center space-x-2'>
            { paths.map((path, index) => (
                <div key={index} className='flex items-center space-x-2'>
                    <Path 
                        title={path.title}
                        href={path.href}
                    />
                    { index !== paths.length - 1 && (
                        <ChevronRightIcon className='w-3 h-3' />
                    )}
                </div>
            ))}
        </div>
    );
};

const Path = ({ title, href }: PathProps) => {
    const currentPath = usePathname();
    
    return (
        <Link
            href={href}
            className={`${currentPath === href ? 'text-tihlde' : 'text-gray-500 hover:text-tihlde'} text-sm`}
        >
            { title }
        </Link>
    );
};


export default PathNavigation;