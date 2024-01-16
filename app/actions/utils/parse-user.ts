import Role from "@/app/enums/role";
import { User } from "@prisma/client";


export type UserForm = Pick<
    User,
    'role'
>;


const parseUser = (formData: FormData): UserForm => {
    return {
        role: formData.get('role') as Role
    }
};


export default parseUser;