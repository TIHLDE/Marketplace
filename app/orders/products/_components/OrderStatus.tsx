import cn from "@/app/utils/cn";
import { OrderStatus as Status } from "@/app/utils/enums";
import { ClassValue } from "clsx";


interface OrderStatusProps {
    status: string;
    className?: ClassValue;
};

const OrderStatus = ({ status, className }: OrderStatusProps) => {
    const mainClass = cn('px-2 py-1 rounded-md text-xs font-semibold border inline-block', className);
    switch (status) {
        case Status.CANCEL:
            return (
                <div className={cn(mainClass, 'border-coral-red-700 text-coral-red-700')}>
                    Avbrutt
                </div>
            );
        
        case Status.INITIATE:
            return (
                <div className={cn(mainClass, 'border-vipps-default text-vipps-default')}>
                    Initiert
                </div>
            );
        case Status.RESERVED:
            return (
                <div className={cn(mainClass, 'border-caribbean-700 text-caribbean-700')}>
                    Reservert
                </div>
            );
        case Status.SALE:
            return (
                <div className={cn(mainClass, 'border-caribbean-700 text-caribbean-700')}>
                    Betalt
                </div>
            );
        case Status.CAPTURE:
            return (
                <div className={cn(mainClass, 'border-caribbean-700 text-caribbean-700')}>
                    Betalt
                </div>
            );
        case Status.REFUND:
            return (
                <div className={cn(mainClass, 'border-vipps-default text-vipps-default')}>
                    Refundert
                </div>
            );
        default:
            return (
                <div className={cn(mainClass, 'border-coral-red-700 text-coral-red-700')}>
                    Avbrutt
                </div>
            );
    }
};


export default OrderStatus;