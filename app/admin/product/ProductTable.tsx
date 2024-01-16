import Table from "../_components/table/Table";
import TableWrapper from "../_components/table/Wrapper";
import TableHeader from "../_components/table/Header";
import TableHead, { TableHeadEdit } from "../_components/table/Head";
import TableRow from "../_components/table/Row";
import TableCell, { TableCellEdit } from "../_components/table/Cell";
import { ProductWithInfo } from "@/app/db/product";


const ProductTable = ({ products }: { products: ProductWithInfo[] }) => {
    return (
        <TableWrapper>
            <Table>
                <TableHeader>
                    <TableHead text='Produktnavn' />
                    <TableHead text='Kategori' />
                    <TableHead text='Pris' />
                    <TableHead text='Rabatt' />
                    <TableHead text='Beholdning' />
                    <TableHead text='Fremvist' />
                    <TableHead text='Arkivert' />
                    <TableHead text='Opprettet' />
                    <TableHeadEdit />
                </TableHeader>
                <tbody>
                    {products.map((product, index) => (
                        <TableRow
                            key={index}
                            border={index !== products.length - 1}
                        >
                            <TableCell text={product.name} />
                            <TableCell text={product.category ? product.category.name : 'Ingen'} />
                            <TableCell text={`${product.price} nok`} />
                            <TableCell text={product.discount ? `${product.discount.discount_percent.toString()}%` : 'Ingen'} />
                            <TableCell text={product.current_stock.toString()} />
                            <TableCell text={product.featured ? 'Ja' : 'Nei'} />
                            <TableCell text={product.archived ? 'Ja' : 'Nei'} />
                            <TableCell text={product.createdAt.toLocaleDateString()} />
                            <TableCellEdit 
                                href={`product/${product.id}`}
                            />
                        </TableRow>
                    ))}
                </tbody>
            </Table>
        </TableWrapper>
    );
};


export default ProductTable;