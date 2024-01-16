import { User } from "@prisma/client";
import TableWrapper from "../_components/table/Wrapper";
import Table from "../_components/table/Table";
import TableHeader from "../_components/table/Header";
import TableHead, { TableHeadEdit } from "../_components/table/Head";
import TableCell, { TableCellEdit } from "../_components/table/Cell";
import TableAvatar from "../_components/table/Avatar";
import TableRow from "../_components/table/Row";


interface UserTableProps {
    users: User[];
};

const UserTable = ({ users }: UserTableProps) => {
    return (
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
                    {users.map((user, index) => (
                        <TableRow 
                            key={index}
                            border={index !== users.length - 1}
                        >
                            <TableAvatar 
                                name={user.name}
                                url={user.image}
                            />
                            <TableCell text={user.name} />
                            <TableCell text={user.role} />
                            <TableCell text={user.email} />
                            <TableCell text={user.createdAt.toLocaleDateString()} />
                            <TableCellEdit 
                                href={`user/${user.id}`}
                            />
                        </TableRow>
                    ))}
                </tbody>
            </Table>
        </TableWrapper>
    );
};


export default UserTable;