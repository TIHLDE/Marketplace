import PathNavigation from "@/app/components/links/PathNavigation";
import Template from "../_components/Template";
import HeaderWrapper from "../_components/wrapper/Header";
import Header from "../_components/Header";
import NewLink from "@/app/components/links/New";
import { PRODUCT_PAGE_PATHS } from "@/app/utils/paths";
import TableWrapper from "../_components/table/Wrapper";
import Table from "../_components/table/Table";
import TableHeader from "../_components/table/Header";
import TableHead, { TableHeadEdit } from "../_components/table/Head";
import TableRow from "../_components/table/Row";
import TableCellSkeleton from "@/app/components/skeleton/TableCell";


const LoadingProductPage = () => {
    
    return (
        <Template>
            <HeaderWrapper>
                <div className='space-y-2'>
                    <PathNavigation paths={PRODUCT_PAGE_PATHS} />
                    <Header
                        title='Produkter'
                        description='Administrer produkter'
                    />
                </div>
                <NewLink
                    href='/admin/product/new'
                    title='Nytt produkt'
                />
            </HeaderWrapper>

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
                        {Array.from({ length: 10 }).map((_, index) => (
                            <TableRow
                                key={index}
                                border={index !== 9}
                            >
                                <TableCellSkeleton />
                                <TableCellSkeleton />
                                <TableCellSkeleton />
                                <TableCellSkeleton />
                                <TableCellSkeleton />
                                <TableCellSkeleton />
                                <TableCellSkeleton />
                                <TableCellSkeleton />
                            </TableRow>
                        ))}
                    </tbody>
                </Table>
            </TableWrapper>
        </Template>
    ); 
};


export default LoadingProductPage;