'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import MarkdownRenderer from './MarkdownRenderer';
import markdownGuideText from '@/app/utils/markdownGuide';


const MarkdownGuide = () => {
    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <button
                    className='text-sm text-tihlde-500 hover:text-tihlde-700 underline cursor-pointer'
                >
                    Hvordan formaterer jeg teksten min?
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className='fixed inset-0 bg-black bg-opacity-50' />
                <Dialog.Content className='fixed max-w-xl w-full h-[80%] bg-white rounded-md px-12 py-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-y-scroll'>
                    <Dialog.Title
                        className='text-xl font-semibold pb-4'
                    >
                        Formaterings-guide
                    </Dialog.Title>
                    <Dialog.Description className='w-full'>
                        <MarkdownRenderer value={markdownGuideText} />
                    </Dialog.Description>
                    <Dialog.Close asChild>
                        <button>
                            <Cross2Icon className='absolute top-2 right-2 w-6 h-6' />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};


export default MarkdownGuide;