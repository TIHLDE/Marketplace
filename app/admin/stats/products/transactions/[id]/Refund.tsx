'use client';

import refundPaymentOrder from "@/app/actions/refund-paymentOrder";
import VippsButton from "@/app/components/buttons/Vipps";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "react-toastify";


interface RefundPaymentOrderProps {
    id: string;
};

const RefundPaymentOrder = ({ id }: RefundPaymentOrderProps) => {
    const [state, formAction] = useFormState(
        refundPaymentOrder.bind(null, id), {
            status: '',
            errors: undefined,
            form: {
                id: ''
            }
        }
    );
    const { pending } = useFormStatus();

    useEffect(() => {
        if (state.status === 'success') {
            toast.success('Statusen ble revalidert');
        } else if (state.status === 'error') {
            toast.error('Noe gikk galt. Prøv igjen senere');
        } else if (state.status === 'field-error') {
            toast.error('Noe gikk galt. Prøv igjen senere');
        };
    }, [state]);

    return (
        <form
            action={formAction}
        >
            <VippsButton 
                idleText='Refunder'
                loadingText='Refunderer...'
                isLoading={pending}
                disabled={pending}
                className='py-2 w-40'
            />
        </form>
    );
};


export default RefundPaymentOrder;