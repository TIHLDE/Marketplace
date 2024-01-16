'use client';

import * as Form from '@radix-ui/react-form';


import TextInput from '@/app/components/inputs/TextInput';
import TextBoxInput from '@/app/components/inputs/TextBoxInput';
import { useEffect, useRef } from 'react';
import NumberInput from '@/app/components/inputs/NumberInput';
import Switch from '@/app/components/inputs/Switch';
import { Discount } from '@prisma/client';
import { useFormState } from 'react-dom';
import SubmitButton from '@/app/components/buttons/Submit';
import editDiscount from '@/app/actions/update-discount';
import addDiscount from '@/app/actions/create-discount';
import { toast } from 'react-toastify';


interface DiscountFormProps {
    discount?: Discount
};

const initialState = {
    status: '',
    errors: undefined,
    form: {
        name: '',
        description: '',
        discount_percent: 0,
        active: false
    }
};

const DiscountForm = ({ discount }: DiscountFormProps) => {
    const [state, formAction] = useFormState(
        discount ? editDiscount.bind(null, discount.id) : addDiscount,
        initialState
    );

    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state.status === 'success') {
            formRef.current?.reset();
            toast.success('Rabatt lagret');
        } else if (state.status === 'field-error') {
            toast.error('Feltene er ikke riktig utfylt');
        } else if (state.status === 'error') {
            toast.error('Noe gikk galt');
        }
    }, [state]);

    return (
        <Form.Root
            ref={formRef}
            action={formAction}
            className='max-w-xl w-full mx-auto space-y-6'
        >
            <Switch 
                name='active'
                label='Aktiv rabatt'
                checked={discount ? discount.active : true}
            />

            <div className='flex items-center space-x-12'>
                <TextInput 
                    name='name'
                    label='Navn'
                    required={true}
                    valueMissing='Skriv inn et navn'
                    defaultValue={discount?.name}
                />

                <NumberInput 
                    name='discount_percent'
                    label='Rabatt i prosent'
                    required={true}
                    valueMissing='Skriv inn en prosent'
                    defaultValue={discount?.discount_percent}
                    placeholder='10'
                />
            </div>

            <TextBoxInput 
                name='description'
                label='Beskrivelse'
                required={true}
                valueMissing='Skriv inn en beskrivelse'
                defaultValue={discount?.description}
            />

            <SubmitButton 
                idleText={discount ? 'Oppdater rabatt' : 'Opprett rabatt'}
                submittingText={discount ? 'Lagrer...' : 'Oppretter...'}
            />

        </Form.Root>
    );
};


export default DiscountForm;