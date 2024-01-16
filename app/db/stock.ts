import prisma from "@/prisma/client";


export const decreaseProductVariantStock = async (id: string) => {
    await prisma.stock.update({
        where: {
            id: id
        },
        data: {
            current_stock: {
                decrement: 1
            }
        }
    });
};

export const increaseProductVariantStock = async (id: string) => {
    await prisma.stock.update({
        where: {
            id: id
        },
        data: {
            current_stock: {
                increment: 1
            }
        }
    });
};