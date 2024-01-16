'use server';

import { ZodError } from "zod";
import { CategoryState } from "./create-category";
import parseCategory from "./utils/parse-category";
import { categorySchema } from "../validationSchemas";
import { updateCategory } from "../db/category";
import { revalidatePath } from "next/cache";


const editCategory = async (
    id: string,
    prevState: CategoryState,
    formData: FormData
): Promise<CategoryState> => {
    const category = parseCategory(formData);

    try {
        const validation = categorySchema.parse(category);
        await updateCategory(id, validation);

        revalidatePath(`admin/categories/${id}`);

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
};


export default editCategory;