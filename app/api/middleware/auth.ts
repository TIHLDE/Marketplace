import { Session } from "next-auth";


const hasAccess = (role: string, roles: string[]) => { return roles.includes(role) };

export const isLoggedIn = (session: Session | null) => { return session ? true : false; } 


export default hasAccess;
