'use server';

import { categorySchema } from "@/app/validationSchemas";
import { revalidatePath } from "next/cache";
import parseCategory, { CategoryForm } from "./utils/parse-category";
import { ZodError } from "zod";
import { createCategory } from "../db/category";


export type CategoryState = {
    status: string,
    errors: Record<keyof CategoryForm, string> | string | undefined,
    form: CategoryForm
};

const addCategory = async (
    prevState: CategoryState,
    formData: FormData
): Promise<CategoryState> => {
    const category = parseCategory(formData);

    try {
        const validation = categorySchema.parse(category);

        await createCategory(validation);

        revalidatePath('/admin/categories/new');

        return {
            status: 'success',
            errors: undefined,
            form: {
                name: '',
                description: ''
            }
        }
    } catch (e) {
        const error = e as Error;

        if (error instanceof ZodError) {
            const errorMap = error.flatten().fieldErrors;
            return {
                status: 'field-error',
                errors: {
                    name: errorMap.name?.[0] ?? '',
                    description: errorMap.description?.[0] ?? ''
                },
                form: category
            }
        }

        return {
            status: 'error',
            errors: error.message,
            form: category
        }
    }
}


export default addCategory;