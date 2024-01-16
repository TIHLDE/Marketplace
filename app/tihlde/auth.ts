import axios from "axios";

import { hoursToSeconds } from 'date-fns';

import { cookies } from 'next/headers';

import prisma from "@/prisma/client";

import { AUTH_TOKEN_COOKIE_KEY, TIHLDE_API_URL, USER_STORAGE_KEY } from "../values";


export type AuthenticateParams = {
    user_id: string;
    password: string;

};

export const loginToTIHLDE = async (user_id: string, password: string ): Promise<string> => {
    const response = await axios.post<{ token: string }>(`${TIHLDE_API_URL}/auth/login/`, { user_id, password });
    return response.data.token;
};

export const getTIHLDEUser = async (token: string, user_id: string) => {
    const headers = {
        'Content-Type': 'application/json',
        'x-csrf-token': token
    }

    const response = await axios.get(`${TIHLDE_API_URL}/users/${user_id}/`, { headers: headers });
    return response.data;
};