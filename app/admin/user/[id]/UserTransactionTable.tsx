'use client';

import Table from "../../_components/table/Table";
import TableHeader from "../../_components/table/Header";
import TableWrapper from "../../_components/table/Wrapper";
import TableHead, { TableHeadEdit } from "../../_components/table/Head";

const UserTranscationTable = () => {
    return (
        <TableWrapper>
            <Table>
                <TableHeader>
                    <TableHead text='Ordre ID' />
                    <TableHead text='Arrangement' />
                    <TableHead text='Status' />
                    <TableHead text='Dato' />
                    <TableHeadEdit />
                </TableHeader>
            </Table>
        </TableWrapper>
    );
};


export default UserTranscationTable;