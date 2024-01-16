'use server';

import { revalidatePath } from "next/cache";
import { sizeSchema } from "../validationSchemas";
import { SizeState } from "./create-size";
import parseSize from "./utils/parse-size";
import { updateSize } from "../db/size";
import { ZodError } from "zod";


const editSize = async (
    id: string,
    prevState: SizeState,
    formData: FormData
): Promise<SizeState> => {
    const size = parseSize(formData);

    try {
        const validation = sizeSchema.parse(size);

        await updateSize(id, validation);

        revalidatePath(`/admin/sizes/${id}`);

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


export default editSize;