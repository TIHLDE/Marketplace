import TableCell, { TableCellEdit } from "@/app/admin/_components/table/Cell";
import TableHead, { TableHeadEdit } from "@/app/admin/_components/table/Head";
import TableHeader from "@/app/admin/_components/table/Header";
import TableRow from "@/app/admin/_components/table/Row";
import Table from "@/app/admin/_components/table/Table";
import TableWrapper from "@/app/admin/_components/table/Wrapper";
import { PaymentOrderWithUser } from "@/app/db/paymentOrder";
import TransactionUser from "../../_components/TransactionUser";
import OrderStatus from "@/app/orders/products/_components/OrderStatus";


interface ProductTransactionTableProps {
    transactions: PaymentOrderWithUser[];
};

const ProductTransactionTable = ({ transactions }: ProductTransactionTableProps) => {
    return (
        <TableWrapper>
            <Table>
                <TableHeader>
                    <TableHead text='Bruker' />
                    <TableHead text='Ordre id' />
                    <TableHead text='Dato' />
                    <TableHead text='Beløp' />
                    <TableHead text='Status' className='text-center' />
                    <TableHeadEdit />
                </TableHeader>
                <tbody>
                    {transactions.map((transaction, index) => (
                        <TableRow
                            key={index}
                            border={index !== transactions.length - 1}
                        >
                            <TransactionUser user={transaction.user} />
                            <TableCell text={transaction.id} />
                            <TableCell text={transaction.createdAt.toLocaleString('nb-NO')} />
                            <TableCell text={`kr ${transaction.total_price}`} />
                            <td className='text-center'>
                                <OrderStatus status={transaction.status} />
                            </td>
                            <TableCellEdit href={`/admin/stats/products/transactions/${transaction.id}`} />
                        </TableRow>
                    ))}
                </tbody>
            </Table>
        </TableWrapper>
    );
};


export default ProductTransactionTable;