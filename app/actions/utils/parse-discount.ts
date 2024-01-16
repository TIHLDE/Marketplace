import { Discount } from "@prisma/client";


export type DiscountForm = Pick<
    Discount,
    'name' |
    'description' |
    'discount_percent' |
    'active'
>;

const parseDiscount = (formData: FormData): DiscountForm => {
    return {
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        discount_percent: Number(formData.get('discount_percent') as string),
        active: Boolean(formData.get('active') as string)
    };
};


export default parseDiscount;