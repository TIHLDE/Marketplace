import * as Form from '@radix-ui/react-form';


interface TextInputProps {
    name: string;
    valueMissing: string;
    required: boolean;
    label: string;
    defaultValue: string | undefined;
    description?: string;
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const TextBoxInput = ({
    name,
    valueMissing,
    required,
    label,
    defaultValue,
    description,
    onChange
}: TextInputProps) => {
    return (
        <Form.Field name={name}>
            <div className='flex items-center justify-between pb-1'>
                <Form.Label className='font-semibold space-y-2'>
                    {label}
                    { description && (
                        <p className='text-sm text-gray-500'>
                            {description}
                        </p>
                    ) }
                </Form.Label>
                <Form.Message
                    className='text-red-500 font-semibold' 
                    match='valueMissing'
                >
                    {valueMissing}
                </Form.Message>
            </div>
            <Form.Control asChild>
                <textarea 
                    className='h-44 outline-none w-full border border-gray-300 bg-white rounded-md px-3 py-2'
                    required={required}
                    defaultValue={defaultValue}
                    onChange={onChange}
                />
            </Form.Control>
        </Form.Field>
    );
};


export default TextBoxInput;
