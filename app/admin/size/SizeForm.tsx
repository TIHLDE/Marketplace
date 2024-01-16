'use client';

import * as Form from '@radix-ui/react-form';

import { useEffect, useRef } from "react";

import { useFormState } from 'react-dom';

import Size from "@/app/types/size";
import TextInput from '@/app/components/inputs/TextInput';
import SubmitButton from '@/app/components/buttons/Submit';
import editSize from '@/app/actions/update-size';
import addSize from '@/app/actions/create-size';
import { toast } from 'react-toastify';


interface SizeFormProps {
    size?: Size
};

const initialState = {
    status: '',
    errors: undefined,
    form: {
        name: '',
        value: ''
    }
};

const SizeForm = ({ size }: SizeFormProps) => {
    const [state, formAction] = useFormState(
        size ? editSize.bind(null, size.id) : addSize,
        initialState
    );

    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state.status === 'success') {
            formRef.current?.reset();
            toast.success('Størrelsen ble lagret');
        } else if (state.status === 'field-error') {
            toast.error('Fyll inn alle feltene');
        } else if (state.status === 'error') {
            toast.error('Noe gikk galt. Prøv igjen senere');
        }
    }, [state]);

    return (
        <Form.Root
            ref={formRef}
            action={formAction} 
            className='max-w-xl w-full mx-auto space-y-6'
        >
            <TextInput 
                name='name'
                label='Navn'
                required={true}
                valueMissing='Skriv inn et navn'
                defaultValue={size?.name}
            />

            <TextInput 
                name='value'
                label='Verdi'
                required={true}
                valueMissing='Skriv inn en verdi'
                defaultValue={size?.value}
            />

            <SubmitButton 
                idleText={size ? 'Oppdater størrelse' : 'Opprett størrelse'}
                submittingText={size ? 'Lagrer...' : 'Oppretter...'}
            />
        </Form.Root>
    );
};


export default SizeForm;