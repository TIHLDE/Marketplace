import prisma from "@/prisma/client";
import { User } from "@prisma/client";
import Role from "../enums/role";


export const getUserByEmail = async (email: string): Promise<User | null> => {
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    return user;
};

export const getUserCount = async (search: string): Promise<number> => {
    const count = await prisma.user.count({
        where: {
            name: {
                contains: search
            }
        }
    });

    return count;
};

export const getUsers = async (skip: number, take: number, search: string): Promise<User[]> => {
    const users = await prisma.user.findMany({
        where: {
            name: {
                contains: search
            }
        },
        orderBy: {
            name: 'asc'
        },
        take,
        skip
    });

    return users;
};

export const getUser = async (id: string): Promise<User | null> => {
    const user = await prisma.user.findUnique({
        where: {
            id
        }
    });

    return user;
};

export const updateUserRole = async (id: string, role: Role): Promise<void> => {
    await prisma.user.update({
        where: {
            id
        },
        data: {
            role
        }
    });
};