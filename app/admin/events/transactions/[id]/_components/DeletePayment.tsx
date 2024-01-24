'use client';

import { deleteTransaction } from "@/app/tihlde/transactions";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


interface DeletePaymentProps {
    order_id: string;
};

const DeletePayment = ({ order_id }: DeletePaymentProps) => {
    const router = useRouter();

    const handleDelete = async () => {
        try {
            await deleteTransaction(order_id);
            router.push('/admin/events/transactions');
            router.refresh();
        } catch (error) {
            toast.error('Noe gikk galt med slettingen av betalingen.');
        };
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger
                className='h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
            >
                Slett betaling
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Er du helt sikker?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Denne handlingen kan ikke bli reversert. Dette vil slette orderen i databasen til TIHLDE, men vil ikke påvirke orderen i Vipps.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>
                        Avbryt
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                    >
                        Slett
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};


export default DeletePayment;