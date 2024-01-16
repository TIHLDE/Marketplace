import prisma from "@/prisma/client";
import { Size } from "@prisma/client";
import { SizeForm } from "../actions/utils/parse-size";


export const createSize = async (size: SizeForm): Promise<Size> => {
    const newSize = await prisma.size.create({
        data: {
            name: size.name,
            value: size.value
        }
    });

    return newSize;
};

export const updateSize = async (id: string, size: SizeForm): Promise<Size> => {
    const updatedSize = await prisma.size.update({
        where: {
            id: id
        },
        data: {
            name: size.name,
            value: size.value
        }
    });

    return updatedSize;
};

export const getSize = async (id: string): Promise<Size | null> => {
    const size = await prisma.size.findUnique({
        where: {
            id: id
        }
    });

    return size;
};

export const getSizes = async (
    skip: number | undefined = undefined, 
    take: number | undefined = undefined
): Promise<Size[]> => {

    const sizes = await prisma.size.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        skip,
        take
    });

    return sizes;
};

export const getSizeCount = async (): Promise<number> => {
    const count = await prisma.size.count();

    return count;
};