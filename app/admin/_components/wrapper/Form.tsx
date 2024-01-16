

const FormWrapper = ({ children }: React.PropsWithChildren) => {
    return (
        <div className='w-full px-8 py-12 rounded-md border border-gray-200'>
            { children }
        </div>
    );
};


export default FormWrapper;