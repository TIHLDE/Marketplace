import * as Form from '@radix-ui/react-form';

interface NumberInputProps {
    name: string;
    valueMissing: string;
    required: boolean;
    label: string;
    defaultValue?: number | undefined;
    placeholder?: string;
    min?: number;
    max?: number;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const NumberInput = ({ 
    name,
    valueMissing,
    required,
    label,
    defaultValue,
    placeholder,
    min,
    max,
    onChange
}: NumberInputProps) => {
    return (
        <Form.Field name={name} className='w-full'>
            <div className='flex items-center justify-between pb-1'>
                <Form.Label className='font-semibold'>
                    {label}
                </Form.Label>
                <Form.Message
                    className='text-red-500 font-semibold' 
                    match='valueMissing'
                >
                    {valueMissing}
                </Form.Message>
            </div>
            <Form.Control asChild>
                <input 
                    className='outline-none w-full border border-gray-300 bg-white rounded-md px-3 py-2'
                    type='number'
                    min={min}
                    max={max}
                    required={required}
                    defaultValue={defaultValue?.toString()}
                    placeholder={placeholder}
                    onChange={onChange}
                />
            </Form.Control>
        </Form.Field>
    );
};


export default NumberInput;