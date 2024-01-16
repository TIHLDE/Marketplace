

const TableWrapper = ({ children }: React.PropsWithChildren) => {
    return (
        <div className='relative overflow-x-auto rounded-lg border border-gray-200'>
            { children }
        </div>
    );
};


export default TableWrapper;