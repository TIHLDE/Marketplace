

const Template = ({ children }: React.PropsWithChildren) => {
    return (
        <div className='w-full bg-white p-12 overflow-x-auto'>
            { children }
        </div>
    );
};


export default Template;