import { Size } from "@prisma/client";


export type SizeForm = Pick<
    Size,
    'name' |
    'value'
>;

const parseSize = (formData: FormData): SizeForm => {
    return {
        name: formData.get('name') as string,
        value: formData.get('value') as string
    };
};


export default parseSize;