import * as Form from '@radix-ui/react-form';


const SaveButton = ({ text, disabled }: { text: string, disabled: boolean }) => {
    return (
        <Form.Submit
            disabled={disabled}
            className='w-44 bg-black text-white font-semibold rounded-md px-3 py-2'
        >
            { text }
        </Form.Submit>
    );
};


export default SaveButton;