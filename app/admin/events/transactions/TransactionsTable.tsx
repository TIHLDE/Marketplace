import getFallbackName from "@/app/functions/getFallbackName";
import { EventTransactionResult } from "@/app/tihlde/transactions";
import { TableCell, TableHead, TableWrapper } from "@/components/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableHeader, TableRow } from "@/components/ui/table";
import { convertTransactionStatus } from "@/lib/utils";


interface TransactionsTableProps {
    transactions: EventTransactionResult[];
};

const TransactionsTable = async ({ transactions }: TransactionsTableProps) => {
    return (
        <TableWrapper>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            Bruker
                        </TableHead>
                        <TableHead>
                            Ordre ID
                        </TableHead>
                        <TableHead>
                            Arrangement
                        </TableHead>
                        <TableHead>
                            Status
                        </TableHead>
                        <TableHead>
                            Opprettet
                        </TableHead>
                        <TableHead edit />
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {transactions.map((transaction, index) => (
                        <TableRow
                            key={index}
                        >
                            <TableCell>
                                <div className='flex items-center space-x-2'>
                                    <Avatar>
                                        <AvatarImage src={transaction.user.image} />
                                        <AvatarFallback>
                                            { getFallbackName(`${transaction.user.first_name} ${transaction.user.last_name}`) }
                                        </AvatarFallback>
                                    </Avatar>
                                    <h1 className='text-sm'>
                                        { `${transaction.user.first_name} ${transaction.user.last_name}` }
                                    </h1>
                                </div>
                            </TableCell>
                            <TableCell className='text-xs'>
                                { transaction.order_id }
                            </TableCell>
                            <TableCell>
                                { transaction.event ? transaction.event.title : 'Ingen' }
                            </TableCell>
                            <TableCell>
                                { convertTransactionStatus(transaction.status) }
                            </TableCell>
                            <TableCell>
                                { `${new Date(transaction.created_at).toLocaleTimeString()} ${new Date(transaction.created_at).toLocaleDateString()}` }
                            </TableCell>
                            <TableCell link={`/admin/events/transactions/${transaction.order_id}`} />
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableWrapper>
    );
};

export default TransactionsTable;