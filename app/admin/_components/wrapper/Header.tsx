

const HeaderWrapper = ({ children }: React.PropsWithChildren) => {
    return (
        <div className='pb-12'>
            <div className='pb-4 border-b border-gray-200 flex items-center justify-between'>
                { children }
            </div>
        </div>
    );
};


export default HeaderWrapper;