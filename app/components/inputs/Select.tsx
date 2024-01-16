import * as Form from '@radix-ui/react-form';


interface SelectProps {
    name: string;
    label: string;
    defaultValue: string | null | undefined;
    options: { [key: string]: string }[];
    required?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select = ({
    name,
    label,
    defaultValue,
    options,
    required = true,
    onChange
}: SelectProps) => {
    return (
        <Form.Field name={name} className='w-full'>
            <div className='flex items-center justify-between pb-1'>
                <Form.Label className='font-semibold'>
                    {label}
                </Form.Label>
            </div>
            <Form.Control asChild>
                <select 
                    disabled={!options.length}
                    onChange={onChange}
                    className={`${!options.length ? 'bg-gray-100' : 'bg-white'} outline-none w-full border border-gray-300 rounded-md px-3 py-2`}
                    defaultValue={defaultValue ? defaultValue : 'none'}
                >
                    // TODO: Fix this bug
                    {!required && !defaultValue && <option value='none'>Ingen</option>}
                    {options.map((option, index) => (
                        <option key={index} value={option.key}>
                            {option.value}
                        </option>
                    ))}
                    {!required && defaultValue && <option value='none'>Ingen</option>}
                </select>
            </Form.Control>
        </Form.Field>
    );
};


export default Select;