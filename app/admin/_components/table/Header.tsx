

const TableHeader = ({ children }: React.PropsWithChildren) => {
    return (
        <thead className='text-xs uppercase bg-gray-50 border-b border-gray-200'>
            <tr>
                {children}
            </tr>
        </thead>
    );
};


export default TableHeader;