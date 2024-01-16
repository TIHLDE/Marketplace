

const ContentWrapper = ({ children }: React.PropsWithChildren) => {
    return (
        <div className='flex space-x-12'>
            { children }
        </div>
    );
};


export default ContentWrapper;