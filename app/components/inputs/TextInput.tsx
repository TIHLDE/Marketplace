import * as Form from '@radix-ui/react-form';
import { UseFormRegister } from 'react-hook-form';


interface TextInputProps {
    name: string;
    valueMissing: string;
    required: boolean;
    label: string;
    defaultValue: string | undefined;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextInput = ({ 
    name,
    valueMissing,
    required,
    label,
    defaultValue,
    onChange
}: TextInputProps) => {
    return (
        <Form.Field name={name} className='w-full'>
            <div className='flex items-center justify-between pb-1'>
                <Form.Label className='font-semibold'>
                    { label }
                </Form.Label>
                <Form.Message
                    className='text-red-500 font-semibold' 
                    match='valueMissing'
                >
                    { valueMissing }
                </Form.Message>
            </div>
            <Form.Control asChild>
                <input 
                    className='outline-none w-full border border-gray-300 bg-white rounded-md px-3 py-2'
                    type='text'
                    required={required}
                    defaultValue={defaultValue}
                    onChange={onChange}
                />
            </Form.Control>
        </Form.Field>
    );
};


export default TextInput;