

const ScrollWrapper = ({ children }: React.PropsWithChildren) => {
    return (
        <div className='w-1/6'>
            { children }
        </div>
    );
};


export default ScrollWrapper;