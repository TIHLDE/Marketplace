import { getTIHLDEUser, loginToTIHLDE } from "@/app/tihlde/auth";

import prisma from "@/prisma/client";
import { IS_PRODUCTION } from "@/prisma/serverEnv";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions, Session, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials"


const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Brukernavn', type: 'text', placeholder: 'Brukernavn' },
                password: { label: 'Passord', type: 'password', placeholder: 'Passord' }
            },
            async authorize(credentials, req) {
                if (!credentials?.username || !credentials.password) return null;

                try {
                    if (!IS_PRODUCTION) {
                        const user = await prisma.user.findUnique({
                            where: {
                                tihlde_user_id: credentials.username
                            }
                        });

                        return user;
                    }

                    const tihldeUserToken = await loginToTIHLDE(credentials.username, credentials.password);

                    if (!tihldeUserToken) return null;
    
                    const user = await prisma.user.findUnique({
                        where: {
                            tihlde_user_id: credentials.username
                        }
                    });

                    if (!user) {
                        const tihldeUser = await getTIHLDEUser(tihldeUserToken, credentials.username);
                        const newUser = await prisma.user.create({
                            data: {
                                tihlde_user_id: tihldeUser.user_id,
                                name: `${tihldeUser.first_name} ${tihldeUser.last_name}`,
                                email: tihldeUser.email,
                                image: tihldeUser.image,
                                role: tihldeUser.role
                            }
                        
                        });

                        return newUser;
                    };
    
                    return user;
                } catch (error) {
                    return null;
                }
            }
        })
    ],
    pages: {
        signIn: '/signIn'
    },
    callbacks: {
        async jwt({token, user}: { token: JWT, user: User | AdapterUser }) {
            if (user) {
                // @ts-ignore
                token.role = user.role;
                // @ts-ignore
                token.tihldeId = user.tihlde_user_id;
            }

            return token;
        },

        async session({ session, token }: { session: Session, token: JWT }) {
            return { ...session, role: token.role, tihldeId: token.tihldeId };
        }
    },
    session: {
        strategy: 'jwt'
    }
};


export default authOptions;