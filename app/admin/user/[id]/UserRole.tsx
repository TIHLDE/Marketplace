'use client';

import editUserRole from "@/app/actions/update-userRole";
import Role from "@/app/enums/role";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
            <Select
                name='role'
            >
                <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder='Rolle' />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={Role.MEMBER}>Bruker</SelectItem>
                    <SelectItem value={Role.ADMIN}>Admin</SelectItem>
                    <SelectItem value={Role.SUPERADMIN}>Superadmin</SelectItem>
                </SelectContent>
            </Select>
            <Button
                disabled={pending}
            >
                { pending ? 'Oppdaterer...' : 'Oppdater' }
            </Button>
        </form>
    );
};


export default UserRole;