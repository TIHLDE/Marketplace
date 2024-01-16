import { Product } from "@prisma/client";


export type ProductForm = Pick<
    Product,
    'name' |
    'description' |
    'price' |
    'preOrder' |
    'featured' |
    'total_stock' |
    'seller' |
    'information' |
    'categoryId' |
    'discountId'
> & {
    images: string[];
    sizes: { sizeId: string, stock: number }[];
};

const parseProduct = (formData: FormData): ProductForm => {
    const imageFormData = (formData.get('images') as string)
        .replace('[', '')
        .replace(']', '');
    let images: string[];

    if (imageFormData.length === 0) {
        images = [];
    } else {
        images = imageFormData
            .replace(/"/g, '')
            .split(',');
    }

    const sizeFormData = (formData.get('sizes') as string)

    let sizes: { sizeId: string, stock: number }[];

    if (sizeFormData.length === 0) {
        sizes = [];
    } else {
        sizes = JSON.parse(sizeFormData
            .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":'))
    } 
    
    const totalStock = sizes.reduce((acc, curr) => acc + curr.stock, 0);

    let discountId: string | null;

    if (formData.get('discountId') === 'none') {
        discountId = null;
    } else {
        discountId = formData.get('discountId') as string;
    }

    return {
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        price: Number(formData.get('price')),
        preOrder: Boolean(formData.get('preOrder')),
        featured: Boolean(formData.get('featured')),
        total_stock: totalStock,
        seller: formData.get('seller') as string,
        information: formData.get('information') as string,
        categoryId: formData.get('categoryId') as string,
        sizes: sizes,
        discountId: discountId,
        images: images
    };
};


export default parseProduct;