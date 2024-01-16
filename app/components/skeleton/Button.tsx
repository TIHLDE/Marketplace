import cn from "@/app/utils/cn";
import { ClassValue } from "clsx";


interface ButtonSkeletonProps {
    className?: ClassValue;
};

const ButtonSkeleton = ({ className }: ButtonSkeletonProps) => {
    return (
        <div className={cn('w-44 rounded-md bg-gray-100 animate-pulse py-6', className)} />
    );
};


export default ButtonSkeleton;