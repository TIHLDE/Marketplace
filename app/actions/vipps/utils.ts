'use server';

import { createToken, deleteToken, getToken } from "@/app/db/vippsToken";


export const setVippsHeaders = (accessToken?: string): Headers => {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('client_id', process.env.VIPPS_CLIENT_ID || '');
    headers.append('client_secret', process.env.VIPPS_CLIENT_SECRET || '');
    headers.append('Ocp-Apim-Subscription-Key', process.env.VIPPS_SUBSCRIPTION_KEY || '');
    headers.append('Merchant-Serial-Number', process.env.VIPPS_MERCHANT_SERIAL_NUMBER || '');

    if (accessToken) {
        headers.append('Authorization', `Bearer ${accessToken}`);
    };

    return headers;
};


export type VippsToken =  {
    accessToken: string;
    expiresAt: string;
};

export const getVippsToken = async (): Promise<VippsToken> => {
    const tokenUrl = process.env.VIPPS_TOKEN_URL;

    const headers = setVippsHeaders();

    const res = await fetch(tokenUrl!, {
        method: 'POST',
        headers: headers
    });

    const data = await res.json();

    return {
        accessToken: data.access_token,
        expiresAt: data.expires_on
    }
};

export const getVippsTokenFromDB = async (): Promise<VippsToken> => {
    return await getToken();
};

export const updateVippsTokenInDB = async (token: VippsToken): Promise<void> => {
    await deleteToken();
    await createToken(token);
};

export const isValidVippsToken = (expiresAt: string) => {
    if (!expiresAt) return false;

    const now = new Date().getTime();
    const expiresAtTime = new Date(expiresAt).getTime();
    if (expiresAtTime <= now) {
        return false;
    }
    return true;
};