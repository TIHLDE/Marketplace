'use server';

import { revalidatePath } from "next/cache";
import { updateUserRole } from "../db/user";
import { userSchema } from "../validationSchemas";
import parseUser, { UserForm } from "./utils/parse-user";
import { ZodError } from "zod";


export type UserRoleState = {
    status: string,
    errors: Record<keyof UserForm, string> | string | undefined,
    form: UserForm

};

const editUserRole = async (
    id: string,
    prevState: UserRoleState,
    formData: FormData
) => {
    const user = parseUser(formData);
    console.log(user)
    try {
        const validation = userSchema.parse(user);

        await updateUserRole(id, validation.role);

        revalidatePath(`/admin/users/${id}`);

        return {
            status: 'success',
            errors: undefined,
            form: user
        }
    } catch (e) {
        const error = e as Error;

        if (error instanceof ZodError) {
            const errorMap = error.flatten().fieldErrors;
            return {
                status: 'field-error',
                errors: {
                    role: errorMap.role?.[0] ?? ''
                },
                form: user
            }
        }

        return {
            status: 'error',
            errors: error.message,
            form: user
        }
    };

};


export default editUserRole;