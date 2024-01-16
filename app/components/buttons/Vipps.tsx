import cn from "@/app/utils/cn";
import { ClassValue } from "clsx";


interface VippsButtonProps {
    idleText: string;
    loadingText: string;
    isLoading: boolean;
    disabled: boolean;
    onClick?: () => void;
    className?: ClassValue;
};

const VippsButton = ({
    idleText,
    loadingText,
    isLoading,
    disabled,
    onClick,
    className
}: VippsButtonProps) => {
    return (
        <button
            disabled={disabled}
            className={cn(`${isLoading ? 'bg-vipps-bg text-vipps-default' : 'bg-vipps-default hover:bg-vipps-hover text-white'} rounded-md font-semibold`, className)}
            onClick={ onClick }
        >
            { isLoading ? loadingText : idleText }
        </button>
    );
};


export default VippsButton;