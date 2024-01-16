

const Table = ({ children }: React.PropsWithChildren) => {
    return (
        <table className='w-full text-left text-sm'>
            { children }
        </table>
    );
};


export default Table;