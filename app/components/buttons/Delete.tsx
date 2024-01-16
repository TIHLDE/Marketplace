import { TrashIcon } from '@radix-ui/react-icons';
import { useFormStatus } from 'react-dom';

interface DeleteButtonProps {
    idleText: string;
    submittingText: string;
};

const DeleteButton = ({
    idleText,
    submittingText
}: DeleteButtonProps) => {
    const { pending } = useFormStatus();

    return (
        <button
            className='bg-black text-white font-semibold rounded-md px-3 py-2 flex items-center space-x-2'
        >
            <TrashIcon />
            <h1>
                { pending ? submittingText : idleText }
            </h1>
        </button>
    )
};


export default DeleteButton;