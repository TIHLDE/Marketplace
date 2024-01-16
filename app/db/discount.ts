import prisma from "@/prisma/client";
import { Discount } from "@prisma/client";
import { DiscountForm } from "../actions/utils/parse-discount";


export const createDiscount = async (discount: DiscountForm): Promise<Discount> => {
    const newDiscount = await prisma.discount.create({
        data: {
            name: discount.name,
            description: discount.description,
            discount_percent: discount.discount_percent,
            active: discount.active
        }
    });

    return newDiscount;
};

export const updateDiscount = async (id: string, discount: DiscountForm): Promise<Discount> => {
    const updatedDiscount = await prisma.discount.update({
        where: {
            id: id
        },
        data: {
            name: discount.name,
            description: discount.description,
            discount_percent: discount.discount_percent,
            active: discount.active
        }
    });

    return updatedDiscount;
};

export const getDiscounts = async (desc: boolean = false): Promise<Discount[]> => {
    let discounts: Discount[] = [];

    if (desc) {
        discounts = await prisma.discount.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
    } else {
        discounts = await prisma.discount.findMany();
    }

    return discounts;
};