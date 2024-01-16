import { ProductCategory } from "@prisma/client";


export type CategoryForm = Pick<
    ProductCategory,
    'name' |
    'description'
>;

const parseCategory = (formData: FormData): CategoryForm => {
    return {
        name: formData.get('name') as string,
        description: formData.get('description') as string
    };
};


export default parseCategory;