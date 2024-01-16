'use server';

import { revalidatePath } from "next/cache";
import { updateDiscount } from "../db/discount";
import { discountSchema } from "../validationSchemas";
import { DiscountState } from "./create-discount";
import parseDiscount from "./utils/parse-discount";
import { ZodError } from "zod";


const editDiscount = async (
    id: string,
    prevState: DiscountState,
    formData: FormData
): Promise<DiscountState> => {
    const discount = parseDiscount(formData);

    try {
        const validation = discountSchema.parse(discount);

        await updateDiscount(id, validation);

        revalidatePath(`/admin/discounts/${id}`);

        return {
            status: 'success',
            errors: undefined,
            form: {
                name: '',
                description: '',
                discount_percent: 0,
                active: false
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
                    discount_percent: errorMap.discount_percent?.[0] ?? '',
                    active: errorMap.active?.[0] ?? ''
                },
                form: discount
            }
        }

        return {
            status: 'error',
            errors: error.message,
            form: discount
        }
    }
};


export default editDiscount;