'use client';

import cn from "@/app/utils/cn";
import { CopyIcon } from "@radix-ui/react-icons";
import { ClassValue } from "clsx";
import { toast } from "react-toastify";


interface CopyToClipboardButtonProps {
    text: string;
    copyText: string;
    successText: string;
    className?: ClassValue;
};

const CopyToClipboardButton = ({ text, copyText, successText, className }: CopyToClipboardButtonProps) => {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(copyText);
        toast.success(successText);
    };
    
    return (
        <button
            className={cn(`bg-gray-900 text-white font-semibold flex items-center space-x-2 rounded-md hover:bg-gray-600`, className)}
            onClick={copyToClipboard}
        >
            <CopyIcon />
            <h1>
                { text }
            </h1>
        </button>
    );
}; 


export default CopyToClipboardButton;