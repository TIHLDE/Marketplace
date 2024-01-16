'use client';

import * as Form from '@radix-ui/react-form';
import { useFormStatus } from 'react-dom';


interface SubmitButtonProps {
    idleText: string;
    submittingText: string;
}

const SubmitButton = ({
    idleText,
    submittingText
}: SubmitButtonProps) => {
    const { pending } = useFormStatus();

    return (
        <Form.Submit
            disabled={pending}
            className='w-44 bg-gradient-to-r from-tihlde-500 to-tihlde-700 text-white hover:from-tihlde-600 hover:to-tihlde-700 transition duration-150 ease-in-out font-semibold rounded-md py-3'
        >
            { pending ? submittingText : idleText }
        </Form.Submit>
    );
};


export default SubmitButton;