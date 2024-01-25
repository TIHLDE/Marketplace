import prisma from "@/prisma/client";
import { VippsToken } from "../actions/vipps/utils";


export const getToken = async (): Promise<VippsToken> => {
    const token = await prisma.vippsToken.findFirst();

    if (!token) return {
        accessToken: '',
        expiresAt: ''
    };

    return {
        accessToken: token.token,
        expiresAt: token.expiresAt
    }
}

export const deleteToken = async (): Promise<void> => {
    await prisma.vippsToken.deleteMany();
};

export const createToken = async (token: VippsToken): Promise<void> => {
    await prisma.vippsToken.create({
        data: {
            token: token.accessToken,
            expiresAt: token.expiresAt
        }
    });
};