

interface SwitchProps {
    name: string;
    label: string;
    checked: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Switch = ({
    name,
    label,
    checked,
    onChange
}: SwitchProps) => {
    return (
        <div>
            <label className='relative inline-flex items-center cursor-pointer'>
                <input 
                    name={name}
                    type='checkbox'
                    className='sr-only peer'
                    defaultChecked={checked}
                    onChange={onChange}
                />
                <div 
                    className='w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[""] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-tihlde-600'
                />
                <span className='ms-3 font-semibold'>
                    { label }
                </span>
            </label>
        </div>
    );
};


export default Switch;