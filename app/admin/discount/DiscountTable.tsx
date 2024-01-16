import Discount from "@/app/types/discount";
import TableWrapper from "../_components/table/Wrapper";
import Table from "../_components/table/Table";
import TableHeader from "../_components/table/Header";
import TableHead, { TableHeadEdit } from "../_components/table/Head";
import TableRow from "../_components/table/Row";
import TableCell, { TableCellEdit } from "../_components/table/Cell";


const DiscountTable = ({ discounts }: { discounts: Discount[] }) => {
    return (
        <TableWrapper>
            <Table>
                <TableHeader>
                    <TableHead text='Rabattnavn' />
                    <TableHead text='Beskrivelse' />
                    <TableHead text='Rabattprosent' />
                    <TableHead text='Aktiv' />
                    <TableHead text='Opprettet' />
                    <TableHeadEdit />
                </TableHeader>
                <tbody>
                    {discounts.map((discount, index) => (
                        <TableRow
                            border={index !== discounts.length - 1}
                        >
                            <TableCell text={discount.name} />
                            <TableCell text={discount.description} />
                            <TableCell text={`${discount.discount_percent}%`} />
                            <TableCell text={discount.active ? 'Ja' : 'Nei'} />
                            <TableCell text={discount.createdAt.toLocaleDateString()} />
                            <TableCellEdit 
                                href={`discount/${discount.id}`}
                            />
                        </TableRow>
                    ))}
                </tbody>
            </Table>
        </TableWrapper>
    );
};


export default DiscountTable;
