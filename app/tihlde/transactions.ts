import axios from "axios";
import { getServerSession } from "next-auth";
import { TIHLDE_DEV_API_URL } from "../values";
import authOptions from "../auth/authOptions";


export type EventTransactionResult = {
    order_id: string;
    created_at: string;
    status: string;
    user: {
        user_id: string;
        first_name: string;
        last_name: string;
        email: string;
        image: string;
    },
    event: {
        id: number;
        title: string;
    }
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
    ordering: string
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
    }

    const response = await axios.get(`${TIHLDE_DEV_API_URL}/payments/?page=${page}&search=${search}&ordering=${ordering}`, {
        headers: HEADERS
    });

    return response.data;
};