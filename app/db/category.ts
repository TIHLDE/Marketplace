import { ProductCategory } from "@prisma/client";
import { CategoryForm } from "../actions/utils/parse-category";
import prisma from "@/prisma/client";


export const createCategory = async (category: CategoryForm): Promise<ProductCategory> => {
    const newCategory = await prisma.productCategory.create({
        data: {
            name: category.name,
            description: category.description
        }
    });

    return newCategory;
};

export const updateCategory = async (id: string, category: CategoryForm): Promise<ProductCategory> => {
    const updatedCategory = await prisma.productCategory.update({
        where: {
            id: id
        },
        data: {
            name: category.name,
            description: category.description
        }
    });

    return updatedCategory;
};

export const destroyCategory = async (id: string) => {
    await prisma.productCategory.delete({
        where: {
            id: id
        }
    });
};

export const getCategory = async (id: string): Promise<ProductCategory | null> => {
    const category = await prisma.productCategory.findUnique({
        where: {
            id: id
        }
    });

    return category;
};

export const getCategories = async (
    skip: number | undefined = undefined,
    take: number | undefined = undefined
): Promise<ProductCategory[]> => {

    const categories = await prisma.productCategory.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        skip,
        take
    });

    return categories;
};

export const getCategoryCount = async (): Promise<number> => {
    const count = await prisma.productCategory.count();

    return count;
};
