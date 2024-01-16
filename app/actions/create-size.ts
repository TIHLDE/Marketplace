'use server';

import { revalidatePath } from "next/cache";
import { createSize } from "../db/size";
import parseSize, { SizeForm } from "./utils/parse-size";
import { ZodError } from "zod";
import { sizeSchema } from "../validationSchemas";


export type SizeState = {
    status: string,
    errors: Record<keyof SizeForm, string> | string | undefined,
    form: SizeForm
};


const addSize = async (
    prevState: SizeState,
    formData: FormData
): Promise<SizeState> => {    
    const size = parseSize(formData);

    try {
        const validation = sizeSchema.parse(size);

        await createSize(validation);

        revalidatePath('/admin/sizes/new');

        return {
            status: 'success',
            errors: undefined,
            form: {
                name: '',
                value: ''
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
                    value: errorMap.value?.[0] ?? ''
                },
                form: size
            }
        }

        return {
            status: 'error',
            errors: error.message,
            form: size
        }
    }
};


export default addSize;