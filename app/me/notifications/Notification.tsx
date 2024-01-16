'use client';

import { Notification } from "@prisma/client";
import * as Collapsible from '@radix-ui/react-collapsible';
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { useState } from "react";


interface NotificationProps {
    notification: Notification;
};

const NotificationItem = ({ notification }: NotificationProps) => {
    const [open, setOpen] = useState(false);

    return (
        <Collapsible.Root
            open={open}
            onOpenChange={setOpen}
            className={`border border-gray-300 rounded-md p-4 w-full bg-gray-50`}
        >
            <Collapsible.Trigger className='w-full flex justify-between items-center'>
                <div>
                    <h1 className='text-lg font-semibold'>
                        { notification.title }
                    </h1>
                    <p className='text-gray-500 text-sm'>
                        { notification.createdAt.toLocaleString('nb-NO') }
                    </p>
                </div>
                <ChevronRightIcon className={`w-6 h-6 transition-transform ${open ? 'transform rotate-90' : ''}`} />
            </Collapsible.Trigger>

            <Collapsible.Content className='mt-4'>
                <p>
                    { notification.body }
                </p>
            </Collapsible.Content>
        </Collapsible.Root>
    );
};


export default NotificationItem;