import axios from "axios";

import { TIHLDE_API_URL, TIHLDE_DEV_API_URL } from "../values";


export type AuthenticateParams = {
    user_id: string;
    password: string;

};

export const loginToTIHLDE = async (user_id: string, password: string ): Promise<string> => {
    const response = await axios.post<{ token: string }>(`${TIHLDE_DEV_API_URL}/auth/login/`, { user_id, password });
    return response.data.token;
};

export const getTIHLDEUser = async (token: string, user_id: string) => {
    const headers = {
        'Content-Type': 'application/json',
        'x-csrf-token': token
    }

    const response = await axios.get(`${TIHLDE_DEV_API_URL}/users/${user_id}/`, { headers: headers });
    return response.data;
};