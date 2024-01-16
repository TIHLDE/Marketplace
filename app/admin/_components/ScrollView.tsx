'use client';

import * as ScrollArea from '@radix-ui/react-scroll-area';
import Link from 'next/link';


interface ScrollViewProps {
    title: string,
    children: React.ReactNode
};

const ScrollView = ({ title, children }: ScrollViewProps) => {
    return (
        <div className='w-full py-2 rounded-md border border-gray-200'>
            <h1 className='pb-2 border-b border-gray-200 px-3 text-xl font-semibold'>
                { title }
            </h1>   
            <ScrollArea.Root className='w-full h-60'>
                <ScrollArea.Viewport className='w-full h-full'>
                    { children }
                </ScrollArea.Viewport>

                <ScrollArea.Scrollbar orientation="vertical">
                    <ScrollArea.Thumb />
                </ScrollArea.Scrollbar>
            </ScrollArea.Root>
        </div>
    );
};

interface ScrollItemProps {
    text: string,
    href: string,
    border: boolean
};

export const ScrollItem = ({ text, href, border }: ScrollItemProps) => {
    return (
        <Link
            href={href}
            className={`${border ? 'border-b border-gray-200' : ''} px-4 py-2 block hover:bg-gray-50 text-center`}
        >
            { text }
        </Link>
    );
};


export default ScrollView;