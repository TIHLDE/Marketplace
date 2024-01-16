import Category from "@/app/types/category";
import EditDropdownMenu from "./EditDropdownMenu";
import TableWrapper from "../_components/table/Wrapper";
import Table from "../_components/table/Table";
import TableHeader from "../_components/table/Header";
import TableHead, { TableHeadEdit } from "../_components/table/Head";
import TableRow from "../_components/table/Row";
import TableCell, { TableCellEdit } from "../_components/table/Cell";


const CategoryTable = ({ categories }: { categories: Category[] }) => {
    return (
        <TableWrapper>
            <Table>
                <TableHeader>
                    <TableHead text='Kategorinavn' />
                    <TableHead text='Beskrivelse' />
                    <TableHead text='Opprettet' />
                    <TableHeadEdit />
                </TableHeader>
                <tbody>
                    {categories.map((category, index) => (
                        <TableRow
                            border={index !== categories.length - 1}
                        >
                            <TableCell text={category.name} />
                            <TableCell text={category.description} />
                            <TableCell text={category.createdAt.toLocaleDateString()} />
                            <TableCellEdit href={`category/${category.id}`} />
                        </TableRow>
                    ))}
                </tbody>
            </Table>
        </TableWrapper>
    );
};


export default CategoryTable;