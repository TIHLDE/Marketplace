import PathNavigation from "@/app/components/links/PathNavigation";
import Template from "../_components/Template";
import HeaderWrapper from "../_components/wrapper/Header";
import { ADMIN_USER_PAGE_PATHS } from "@/app/utils/paths";
import Header from "../_components/Header";
import TableWrapper from "../_components/table/Wrapper";
import Table from "../_components/table/Table";
import TableHeader from "../_components/table/Header";
import TableHead, { TableHeadEdit } from "../_components/table/Head";
import TableRow from "../_components/table/Row";
import TableCellSkeleton from "@/app/components/skeleton/TableCell";


const LoadingUserPage = () => {
    return (
        <Template>
            <HeaderWrapper>
                <div className='space-y-2'>
                    <PathNavigation paths={ADMIN_USER_PAGE_PATHS} />
                    <Header
                        title='Brukere'
                        description='Administrer brukere'
                    />
                </div>
            </HeaderWrapper>

            <TableWrapper>
                <Table>
                    <TableHeader>
                        <TableHead text='Bilde' />
                        <TableHead text='Navn' />
                        <TableHead text='Rolle' />
                        <TableHead text='E-post' />
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
                            </TableRow>
                        ))}
                    </tbody>
                </Table>
            </TableWrapper>
        </Template>
    );
};


export default LoadingUserPage;