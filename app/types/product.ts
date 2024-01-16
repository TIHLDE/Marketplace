import { Decimal } from "@prisma/client/runtime/library";
import Category from "./category";
import Discount from "./discount";
import Size from "./size";
import Image from "./image";


interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    preOrder: boolean;
    featured: boolean;
    archived: boolean;
    total_stock: number;
    current_stock: number;
    createdAt: Date;
    updatedAt: Date;
    category?: Category;
    discount?: Discount;
    size?: Size;
    images?: Image[];
};


export default Product;