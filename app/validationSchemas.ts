import { z } from "zod";
import Role from "./enums/role";


export const categorySchema = z.object({
    name: z.string().min(1).max(255),
    description: z.string().min(3).max(255)
});

export const discountSchema = z.object({
    name: z.string().min(1).max(255),
    description: z.string().min(3).max(255),
    discount_percent: z.number().min(0).max(100),
    active: z.boolean()
});

export const sizeSchema = z.object({
    name: z.string().min(1).max(255),
    value: z.string().min(1).max(255)
});


const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/gif',
    'image/svg+xml'
];
export const imageSchema = z.object({
    image: z
        .any()
        .refine(file => file?.[0]?.size <= MAX_FILE_SIZE, 'Bildet kan ikke være større enn 5MB')
        .refine(
            file => ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type),
            'Bildet må være av typen .png, .jpg, .jpeg, .gif eller .svg'
        )
});

const stockSchema = z.object({
    sizeId: z.string().length(25),
    stock: z.number().min(0)
});

export const productSchema = z.object({
    name: z.string().min(1).max(255),
    description: z.string().min(3).max(255),
    price: z.number().min(1),
    total_stock: z.number().min(0),
    seller: z.string(),
    information: z.string(),
    preOrder: z.boolean(),
    featured: z.boolean(),
    categoryId: z.string().length(25),
    sizes: z.array(stockSchema).min(1),
    discountId: z.string().length(25).nullable(),
    images: z.array(z.string().max(103))
});

export const paymentOrderSchema = z.object({
    id: z.string().length(36)
});

export const userSchema = z.object({
    role: z.enum([
        Role.MEMBER,
        Role.ADMIN,
        Role.SUPERADMIN
    ])
});