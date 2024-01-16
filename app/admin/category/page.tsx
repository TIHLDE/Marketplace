import Empty from "../_components/Empty";
import NewLink from "@/app/components/links/New";
import Template from "../_components/Template";
import Header from "../_components/Header";
import CategoryTable from "./CategoryTable";
import PathNavigation from "@/app/components/links/PathNavigation";
import { getCategories, getCategoryCount } from "@/app/db/category";
import { CATEGORY_PAGE_PATHS } from "@/app/utils/paths";
import HeaderWrapper from "../_components/wrapper/Header";
import Pagination from "@/app/components/Pagination";


export interface CategoryQuery {
    page: string;
};

interface CategoryPageProps {
    searchParams: CategoryQuery;
};

const Category = async ({ searchParams }: CategoryPageProps) => {
    const page = parseInt(searchParams.page) || 1;
    const pageSize = 10;

    const categoryCount = await getCategoryCount();
    const categories = await getCategories(
        (page - 1) * pageSize,
        pageSize
    );

    return (
        <Template>
            <HeaderWrapper>
                <div className='space-y-2'>
                    <PathNavigation paths={CATEGORY_PAGE_PATHS} />
                    <Header
                        title='Kategorier'
                        description='Administrer kategorier'
                    />
                </div>
                <NewLink 
                    href='/admin/category/new'
                    title='Ny kategori'
                />
            </HeaderWrapper>

            <Pagination 
                pageSize={pageSize}
                currentPage={page}
                itemCount={categoryCount}
                className='pb-4'
            />

            { !categories.length 
                ? <Empty text='Fant ingen rabatter' /> 
                : <CategoryTable categories={categories} />
            }
        </Template>
    );
};

export default Category;