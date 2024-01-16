'use server';

import { revalidatePath } from "next/cache";
import { productSchema } from "../validationSchemas";
import { ProductState } from "./create-product";
import parseProduct from "./utils/parse-product";
import { ZodError } from "zod";
import { updateProduct } from "../db/product";


const editProduct = async (
    id: string,
    prevState: ProductState,
    formData: FormData
): Promise<ProductState> => {
    const product = parseProduct(formData);

    try {
        const validation = productSchema.parse(product);

        await updateProduct(id, validation);

        revalidatePath(`/admin/products/id`);

        return {
            status: 'success',
            errors: undefined,
            form: {
                name: '',
                description: '',
                price: 0,
                preOrder: false,
                featured: false,
                total_stock: 0,
                categoryId: '',
                sizeId: '',
                discountId: '',
                images: []
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
                    description: errorMap.description?.[0] ?? '',
                    price: errorMap.price?.[0] ?? '',
                    preOrder: errorMap.preOrder?.[0] ?? '',
                    featured: errorMap.featured?.[0] ?? '',
                    total_stock: errorMap.total_stock?.[0] ?? '',
                    categoryId: errorMap.categoryId?.[0] ?? '',
                    sizeId: errorMap.sizeId?.[0] ?? '',
                    discountId: errorMap.discountId?.[0] ?? '',
                    images: errorMap.images?.[0] ?? ''
                },
                form: product
            }
        }

        return {
            status: 'error',
            errors: error.message,
            form: product
        }
    }
};


export default editProduct;