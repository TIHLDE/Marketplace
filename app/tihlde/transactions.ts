'use server';

import axios from "axios";
import { getServerSession } from "next-auth";
import { TIHLDE_DEV_API_URL } from "../values";
import authOptions from "../auth/authOptions";
import hasAccess from "../api/middleware/auth";
import { superAdminRoles } from "../enums/role";


export type Event = {
    id: number;
    title: string;
    image: string;
    start_date: string;
    end_date: string;
};

export type EventTransactionResult = {
    order_id: string;
    created_at: string;
    status: string;
    payment_link?: string;
    user: {
        user_id: string;
        first_name: string;
        last_name: string;
        email: string;
        image: string;
    },
    event: Event;
}

export type EventTransaction = {
    count: number;
    next: string;
    previous: string;
    results: EventTransactionResult[]
};


export const getTransactions = async (
    page: number,
    search: string,
    ordering: string,
    status: string
): Promise<EventTransaction> => {
    const session = await getServerSession(authOptions);

    if (!session) return {
        count: 0,
        next: "",
        previous: "",
        results: []
    };

    const HEADERS = {
        'Content-Type': 'application/json',
        'x-csrf-token': session.tihldeUserToken
    };

    const response = await axios.get(`${TIHLDE_DEV_API_URL}/payments/?page=${page}&search=${search}&ordering=${ordering}&status=${status}`, {
        headers: HEADERS
    });

    return response.data;
};

export const getTransaction = async (order_id: string): Promise<EventTransactionResult | null> => {
    const session = await getServerSession(authOptions);

    if (!session) return null;

    const HEADERS = {
        'Content-Type': 'application/json',
        'x-csrf-token': session.tihldeUserToken
    };

    try {
        const response = await axios.get(`${TIHLDE_DEV_API_URL}/payments/${order_id}`, {
            headers: HEADERS
        });

        return response.data;
    } catch (error) {
        return null;
    };
};

export const deleteTransaction = async (order_id: string): Promise<void> => {
    const session = await getServerSession(authOptions);

    if (!session) return;

    if (!hasAccess(session.role, superAdminRoles)) return;

    const HEADERS = {
        'Content-Type': 'application/json',
        'x-csrf-token': session.tihldeUserToken
    };

    await axios.delete(`${TIHLDE_DEV_API_URL}/payments/${order_id}`, {
        headers: HEADERS
    });

};