import PathNavigation from "@/app/components/links/PathNavigation";
import Header from "../_components/Header";
import Template from "../_components/Template";
import HeaderWrapper from "../_components/wrapper/Header";
import { ADMIN_USER_PAGE_PATHS } from "@/app/utils/paths";
import { getUserCount, getUsers } from "@/app/db/user";
import Pagination from "@/app/components/Pagination";
import Empty from "../_components/Empty";
import UserTable from "./UserTable";
import Search from "@/app/components/Search";
import { TableQueryWrapper } from "@/components/table";


interface UserQuery {
    page: string;
    search: string;
};

interface UserPageProps {
    searchParams: UserQuery;
};

const UserPage = async ({ searchParams }: UserPageProps) => {
    const page = parseInt(searchParams.page) || 1;
    const pageSize = 10;

    const search = searchParams.search || '';

    const userCount = await getUserCount(search);
    const users = await getUsers(
        (page - 1) * pageSize,
        pageSize,
        search
    );

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

            <TableQueryWrapper>
                { (users.length > 0 || search.length > 0) && <Search /> }
                <Pagination 
                    pageSize={pageSize}
                    currentPage={page}
                    itemCount={userCount}
                />
            </TableQueryWrapper>

            { !users.length
                ? <Empty text='Fant ingen brukere' />
                : <UserTable users={users} />
            }
        </Template>
    );
};


export default UserPage;