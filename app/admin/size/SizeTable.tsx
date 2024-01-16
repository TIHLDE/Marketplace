import Size from "@/app/types/size";
import TableWrapper from "../_components/table/Wrapper";
import Table from "../_components/table/Table";
import TableHead, { TableHeadEdit } from "../_components/table/Head";
import TableHeader from "../_components/table/Header";
import TableRow from "../_components/table/Row";
import TableCell, { TableCellEdit } from "../_components/table/Cell";


const SizeTable = ({ sizes }: { sizes: Size[] }) => {
    return (
        <TableWrapper>
            <Table>
                <TableHeader>
                    <TableHead text='Størrelsenavn' />
                    <TableHead text='Verdi' />
                    <TableHead text='Opprettet' />
                    <TableHeadEdit />
                </TableHeader>
                <tbody>
                    {sizes.map((size, index) => (
                        <TableRow
                            key={index}
                            border={index !== sizes.length - 1}
                        >
                            <TableCell text={size.name} />
                            <TableCell text={size.value} />
                            <TableCell text={size.createdAt.toLocaleDateString()} />
                            <TableCellEdit 
                                href={`size/${size.id}`}
                            />
                        </TableRow>
                    ))}
                </tbody>
            </Table>
        </TableWrapper>
    );
};


export default SizeTable;