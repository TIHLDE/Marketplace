'use server';

import { revalidatePath } from "next/cache";
import { productSchema } from "../validationSchemas";
import parseProduct, { ProductForm } from "./utils/parse-product";
import { ZodError } from "zod";
import { createProduct } from "../db/product";


export type ProductState = {
    status: string,
    errors: Record<keyof ProductForm, string> | string | undefined,
    form: ProductForm

};

const addProduct = async (
    prevState: ProductState,
    formData: FormData
): Promise<ProductState> => {
    const product = parseProduct(formData);

    try {
        const validation = productSchema.parse(product);

        await createProduct(validation);

        revalidatePath('/admin/products/new');

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
                seller: '',
                information: '',
                categoryId: '',
                sizes: [],
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
                    seller: errorMap.seller?.[0] ?? '',
                    information: errorMap.information?.[0] ?? '',
                    categoryId: errorMap.categoryId?.[0] ?? '',
                    sizes: errorMap.sizes?.[0] ?? '',
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


export default addProduct;