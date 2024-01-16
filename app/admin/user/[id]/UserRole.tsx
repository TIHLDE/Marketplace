'use client';

import editUserRole from "@/app/actions/update-userRole";
import Role from "@/app/enums/role";
import { $Enums, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "react-toastify";


interface UserRoleProps {
    user: User;
};

const UserRole = ({ user }: UserRoleProps) => {
    const [state, formAction] = useFormState(
        editUserRole.bind(null, user.id),
        {
            status: '',
            errors: undefined,
            form: {
                role: user.role as $Enums.user_role
            }
        }
    );

    useEffect(() => {
        if (state.status === 'success') {
            toast.success('Brukeren ble oppdatert');
        } else if (state.status === 'error') {
            toast.error('Noe gikk galt. Prøv igjen senere');
        } else if (state.status === 'field-error') {
            toast.error('Fyll inn alle feltene');
        }
    }, [state]);

    const { status, data: session } = useSession();
    const { pending } = useFormStatus();

    if (status === 'loading') return null;
    if (session?.role !== Role.SUPERADMIN) return null;

    return (
        <form
            action={formAction}
            className='flex items-center space-x-2'
        >
            <select
                name='role'
                className='outline-none border border-gray-300 rounded-md px-3 py-2 cursor-pointer'
                defaultValue={user.role}
            >
                <option value={Role.MEMBER}>Bruker</option>
                <option value={Role.ADMIN}>Admin</option>
                <option value={Role.SUPERADMIN}>Superadmin</option>
            </select>
            <button
                disabled={pending}
                className='bg-gradient-to-r from-tihlde-500 to-tihlde-700 text-white hover:from-tihlde-600 hover:to-tihlde-700 transition duration-150 ease-in-out font-semibold rounded-md py-2 px-6'
            >
                { pending ? 'Oppdaterer...' : 'Oppdater'}
            </button>
        </form>
    );
};


export default UserRole;