'use client';

import * as Form from '@radix-ui/react-form';

import TextInput from '@/app/components/inputs/TextInput';
import TextBoxInput from '@/app/components/inputs/TextBoxInput';
import { useFormState } from 'react-dom';
import addCategory from '@/app/actions/create-category';
import SubmitButton from '@/app/components/buttons/Submit';
import { useEffect, useRef } from 'react';
import editCategory from '@/app/actions/update-category';
import { ProductCategory } from '@prisma/client';
import { toast } from 'react-toastify';


interface CategoryFormProps {
    category?: ProductCategory;
};

const initialState = {
    status: '',
    errors: undefined,
    form: {
        name: '',
        description: ''
    }
};

const CategoryForm = ({ category }: CategoryFormProps) => {
    const [state, formAction] = useFormState(
        category ? editCategory.bind(null, category.id) : addCategory,
        initialState
    );
    
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state.status === 'success') {
            formRef.current?.reset();
            toast.success('Kategorien ble lagret')
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
                defaultValue={category?.name}
            />

            <TextBoxInput 
                name='description'
                label='Beskrivelse'
                required={true}
                valueMissing='Skriv inn en beskrivelse'
                defaultValue={category?.description}
            />

            <SubmitButton 
                idleText={category ? 'Oppdater kategori' : 'Opprett kategori'}
                submittingText={category ? 'Lagrer...' : 'Oppretter...'}
            />
        </Form.Root>
    );
};


export default CategoryForm;