'use client';

import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";
import { useRouter, useSearchParams } from "next/navigation";
import PaginationButton from "./buttons/Pagination";
import { ClassValue } from "clsx";
import cn from "../utils/cn";


interface PaginationProps {
    itemCount: number;
    pageSize: number;
    currentPage: number;
    className?: ClassValue;
};

const Pagination = ({ itemCount, pageSize, currentPage, className }: PaginationProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const pageCount = Math.ceil(itemCount / pageSize);

    if (pageCount <= 1) return null;

    const changePage = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());
        router.push(`?${params.toString()}`);
    };

    return (
        <div className={cn('flex items-center space-x-2', className)}>
            <PaginationButton 
                icon={<DoubleArrowLeftIcon />}
                disabled={currentPage === 1}
                page={1}
                changePage={changePage}
            />
            <PaginationButton 
                icon={<ChevronLeftIcon />}
                disabled={currentPage === 1}
                page={currentPage - 1}
                changePage={changePage}
            />
            <p>
                { currentPage } av { pageCount }
            </p>
            <PaginationButton 
                icon={<ChevronRightIcon />}
                disabled={currentPage === pageCount}
                page={currentPage + 1}
                changePage={changePage}
            />
            <PaginationButton 
                icon={<DoubleArrowRightIcon />}
                disabled={currentPage === pageCount}
                page={pageCount}
                changePage={changePage}
            />
        </div>
    );
};


export default Pagination;