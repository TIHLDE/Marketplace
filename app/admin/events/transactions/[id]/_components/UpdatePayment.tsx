'use client';

import { updatePaymentOrder } from "@/app/actions/vipps/update-paymentOrder";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

interface UpdatePaymentProps {
    orderId: string;
};

const UpdatePayment = ({ orderId }: UpdatePaymentProps) => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);

    const handleUpdate = async () => {
        setLoading(true);

        try {
            await updatePaymentOrder(orderId);
            toast.success('Ordre oppdatert!');
            router.refresh();
        } catch (e) {
            const error = e as Error;
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger
                className='h-10 px-4 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
            >
                Oppdater ordre
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Er du helt sikker?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Denne handlingen kan ikke bli reversert. Dette vil oppdatere orderen til reell status hentet fra Vipps.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>
                        Avbryt
                    </AlertDialogCancel>
                    <AlertDialogAction
                        disabled={loading}
                        onClick={handleUpdate}
                    >
                        Oppdater
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};


export default UpdatePayment;