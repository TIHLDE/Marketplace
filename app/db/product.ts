import prisma from "@/prisma/client";
import { Discount, Image, ImagesOnProducts, Prisma, Product, ProductCategory, Size, Stock } from "@prisma/client";
import { ProductForm } from "../actions/utils/parse-product";


export type ProductInfo = {
    id: string;
    name: string;
    price: number;
    description: string;
    preOrder: boolean;
    featured: boolean;
    archived: boolean;
    total_stock: number;
    current_stock: number;
    createdAt: Date;
    updatedAt: Date;
    discount: Discount | null;
    category: ProductCategory;
    seller: string;
    information: string | null;
    sizes: ({
        size: Size;
    } & Stock)[];
    images?: ({
        image: Image
    } & ImagesOnProducts)[];
};

export type ProductWithImages = Product & { 
    images: ({
        image: Image;
    } & ImagesOnProducts)[]
};

export const createProduct = async (product: ProductForm): Promise<Product> => {
    const newProduct = await prisma.product.create({
        data: {
            name: product.name,
            description: product.description,
            price: product.price,
            preOrder: product.preOrder,
            featured: product.featured,
            total_stock: product.total_stock,
            seller: product.seller,
            information: product.information,
            current_stock: product.total_stock,
            categoryId: product.categoryId,
            discountId: product.discountId,
            images: {
                create: product.images.map((image, index) => ({
                    imageId: image,
                    order: index
                }))
            },
            sizes: {
                create: product.sizes.map(size => ({
                    sizeId: size.sizeId,
                    stock: size.stock,
                    current_stock: size.stock
                }))
            }
        }
    });

    return newProduct;
};

export const updateProduct = async (id: string, product: ProductForm): Promise<Product> => {

    await prisma.imagesOnProducts.deleteMany({
        where: {
            productId: id
        }
    });

    await prisma.stock.deleteMany({
        where: {
            productId: id
        }
    });

    const updatedProduct = await prisma.product.update({
        where: {
            id: id
        },
        data: {
            name: product.name,
            description: product.description,
            price: product.price,
            preOrder: product.preOrder,
            featured: product.featured,
            total_stock: product.total_stock,
            categoryId: product.categoryId,
            discountId: product.discountId,
            images: {
                create: product.images.map((image, index) => ({
                    imageId: image,
                    order: index
                }))
            },
            sizes: {
                create: product.sizes.map(size => ({
                    sizeId: size.sizeId,
                    stock: size.stock
                }))
            }
        }
    });

    return updatedProduct;
};

export const getProductCount = async (): Promise<number> => {
    const count = await prisma.product.count();

    return count;
};

export type ProductWithInfo = Prisma.ProductGetPayload<{
    include: {
        discount: true;
        category: true;
    }
}>;

export const getProductsWithInfo = async (skip: number, take: number): Promise<ProductWithInfo[]> => {
    const products = await prisma.product.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            discount: true,
            category: true,
        },
        skip,
        take
    });

    return products;
};

export const getProduct = async (id: string): Promise<Product | null> => {
    const product = await prisma.product.findUnique({
        where: {
            id: id
        }
    });

    return product;
};

export const getProducts = async (desc: boolean = false): Promise<Product[]> => {
    let products: Product[] = [];

    if (desc) {
        products = await prisma.product.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
    } else {
        products = await prisma.product.findMany();
    }

    return products;
};

export const getProductWithFullInfo = async (id: string): Promise<ProductInfo | null> => {
    const product = await prisma.product.findUnique({
        where: {
            id: id
        },
        include: {
            discount: true,
            sizes: {
                include: {
                    size: true
                }
            },
            category: true,
            images: {
                include: {
                    image: true
                },
                orderBy: {
                    order: 'asc'
                }
            }
        }
    });

    return product;
};

export const getProductWithImages = async (id: string): Promise<ProductWithImages | null> => {
    const product = await prisma.product.findUnique({
        where: {
            id: id
        },
        include: {
            images: {
                include: {
                    image: true
                },
                orderBy: {
                    order: 'asc'
                }
            } 
        }
    });

    return product;
};

export const getFeaturedProducts = async (take?: number): Promise<ProductInfo[]> => {
    let products: ProductInfo[] = [];

    if (take) {
        products = await prisma.product.findMany({
            where: {
                featured: true
            },
            take: take,
            include: {
                discount: true,
                sizes: {
                    include: {
                        size: true
                    }
                },
                category: true,
                images: {
                    include: {
                        image: true
                    },
                    orderBy: {
                        order: 'asc'
                    }
                }
            }
        });
    } else {
        products = await prisma.product.findMany({
            where: {
                featured: true
            },
            include: {
                discount: true,
                sizes: {
                    include: {
                        size: true
                    }
                },
                category: true,
                images: {
                    include: {
                        image: true
                    },
                    orderBy: {
                        order: 'asc'
                    }
                }
            }
        });
    }

    return products;
};

export const getLatestProducts = async (take?: number): Promise<ProductInfo[]> => {
    let products: ProductInfo[] = [];

    if (take) {
        products = await prisma.product.findMany({
            take: take,
            include: {
                discount: true,
                sizes: {
                    include: {
                        size: true
                    }
                },
                category: true,
                images: {
                    include: {
                        image: true
                    },
                    orderBy: {
                        order: 'asc'
                    }
                }
            }
        });
    } else {
        products = await prisma.product.findMany({
            include: {
                discount: true,
                sizes: {
                    include: {
                        size: true
                    }
                },
                category: true,
                images: {
                    include: {
                        image: true
                    },
                    orderBy: {
                        order: 'asc'
                    }
                }
            }
        });
    }

    return products;
};

export const getPreOrderProducts = async (take?: number): Promise<ProductInfo[]> => {
    let products: ProductInfo[] = [];

    if (take) {
        products = await prisma.product.findMany({
            where: {
                preOrder: true
            },
            take: take,
            include: {
                discount: true,
                sizes: {
                    include: {
                        size: true
                    }
                },
                category: true,
                images: {
                    include: {
                        image: true
                    },
                    orderBy: {
                        order: 'asc'
                    }
                }
            }
        });
    } else {
        products = await prisma.product.findMany({
            where: {
                preOrder: true
            },
            include: {
                discount: true,
                sizes: {
                    include: {
                        size: true
                    }
                },
                category: true,
                images: {
                    include: {
                        image: true
                    },
                    orderBy: {
                        order: 'asc'
                    }
                }
            }
        });
    }

    return products;
};

export const decreaseProductStock = async (id: string) => {
    await prisma.product.update({
        where: {
            id: id
        },
        data: {
            current_stock: {
                decrement: 1
            }
        }
    });
};

export const increaseProductStock = async (id: string) => {
    await prisma.product.update({
        where: {
            id: id
        },
        data: {
            current_stock: {
                increment: 1
            }
        }
    });
};


export type ProductTransaction = Prisma.StockGetPayload<
{
    include: {
        orders: {
            include: {
                paymentOrder: {
                    include: {
                        user: true
                    }
                }
            }
        }
    }
}>;

export const getLatestProductTransactions = async (id: string): Promise<ProductTransaction[]> => {
    const transactions = await prisma.stock.findMany({
        where: {
            productId: id
        },
        include: {
            orders: {
                include: {
                    paymentOrder: {
                        include: {
                            user: true
                        }
                    }
                }
            }
        }
    });

    return transactions;
};
