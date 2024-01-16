'use server';

import { destroyCategory } from "../db/category";


type CategoryState = {
    status: string,
    errors: string | undefined
};

const deleteCategory = async (
    id: string,
    prevState: CategoryState,
    formData: FormData
): Promise<CategoryState> => {
    try {
        await destroyCategory(id);

        return {
            status: 'success',
            errors: undefined
        };
    } catch (e) {
        const error = e as Error;

        return {
            status: 'error',
            errors: error.message
        };
    }
};


export default deleteCategory;