import prisma from "@/prisma/client";
import Template from "../_components/Template";
import Header from "../_components/Header";
import NewLink from "@/app/components/links/New";
import Empty from "../_components/Empty";
import SizeTable from "./SizeTable";
import HeaderWrapper from "../_components/wrapper/Header";
import PathNavigation from "@/app/components/links/PathNavigation";
import { SIZE_PAGE_PATHS } from "@/app/utils/paths";
import { getSizeCount, getSizes } from "@/app/db/size";
import Pagination from "@/app/components/Pagination";
import UnderConstruction from "@/app/components/UnderConstructions";


export interface SizeQuery {
    page: string;
};

interface SizePageProps {
    searchParams: SizeQuery;
};

const Size = async ({ searchParams }: SizePageProps) => {
    return <UnderConstruction />;
    const page = parseInt(searchParams.page) || 1;
    const pageSize = 10;

    const sizeCount = await getSizeCount();

    const sizes = await getSizes(
        (page - 1) * pageSize,
        pageSize
    );

    return (
        <Template>
            <HeaderWrapper>
                <div className='space-y-2'>
                    <PathNavigation paths={SIZE_PAGE_PATHS} />
                    <Header
                        title='Størrelser'
                        description='Administrer størrelser'
                    />
                </div>
                <NewLink
                    href='/admin/size/new'
                    title='Ny størrelse'
                />
            </HeaderWrapper>

            <Pagination 
                pageSize={pageSize}
                currentPage={page}
                itemCount={sizeCount}
                className='pb-4'
            />

            { !sizes.length 
                ? <Empty text='Fant ingen størrelser' /> 
                : <SizeTable sizes={sizes} />
            }
        </Template>
    );
};


export default Size;