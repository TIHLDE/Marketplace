import Avatar from "@/app/components/header/Avatar";
import { User } from "@prisma/client";


interface TransactionUserProps {
    user: User;
};

const TransactionUser = ({ user }: TransactionUserProps) => {
    return (
        <td
            className='p-3 flex items-center space-x-2'
        >
            <Avatar
                name={user.name}
                url={user.image}
            />
            <div className='flex flex-col'>
                <h1 className='font-medium text-sm'>
                    {user.name}
                </h1>
                <p className='text-xs text-gray-500'>
                    {user.email}
                </p>
            </div>
        </td>
    );
};


export default TransactionUser;