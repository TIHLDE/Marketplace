

interface TableRowProps {
    children: React.ReactNode;
    border?: boolean;
};

const TableRow = ({ children, border }: TableRowProps) => {
    return (
        <tr className={`${border ? 'border-b border-gray-300' : ''} bg-white hover:bg-gray-50`}>
            { children }
        </tr>
    );
};


export default TableRow;