import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import authOptions from "../auth/authOptions";
import { getUserByEmail } from "./user";
import { Notification } from "@prisma/client";


export const getMyNotifications = async (): Promise<Notification[]> => {
    const session = await getServerSession(authOptions);

    if (!session) return [];

    const user = await getUserByEmail(session.user?.email!);

    if (!user) return [];

    const notifications = await prisma.notification.findMany({
        where: {
            userId: user.id
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return notifications;
};

export const createNotification = async (title: string, body: string): Promise<void> => {
    const session = await getServerSession(authOptions);

    if (!session) return;

    const user = await getUserByEmail(session.user?.email!);

    if (!user) return;

    await prisma.notification.create({
        data: {
            title: title,
            body: body,
            userId: user.id
        }
    });
};