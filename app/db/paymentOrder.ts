import prisma from "@/prisma/client";
import { Discount, Image, PaymentOrder, Prisma, ProductCategory, ProductsOnPaymentOrder, Stock, User } from "@prisma/client";
import { getVippsPaymentStatus, getVippsToken, isValidVippsToken } from "../api/vipps/utils";
import { ProductInfo, increaseProductStock } from "./product";
import { OrderStatus } from "../utils/enums";
import { increaseProductVariantStock } from "./stock";
import { createNotification } from "./notification";


export type PaymentOrderWithProducts = PaymentOrder & {
    products: (
        ProductsOnPaymentOrder & {
            product: Stock
        }
    )[];
}

export type PaymentOrderWithProductsWithFullInfo = PaymentOrder & {
    products: (
        ProductsOnPaymentOrder & {
            product: {
                product: ProductInfo
            }
        }
    )[];
}


export const getPaymentOrders = async (): Promise<PaymentOrderWithProducts[]> => {
    const paymentOrders = await prisma.paymentOrder.findMany({
        include: {
            products: {
                include: {
                    product: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return paymentOrders;
};

export type PaymentOrderWithProducInfo = Prisma.PaymentOrderGetPayload<{
    include: {
        products: {
            include: {
                product: {
                    include: {
                        product: {
                            include: {
                                discount: true,
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
                        },
                        size: true
                    }
                }
            }
        }
    }
}>;

export type ProductFromPaymentOrder = Prisma.ProductGetPayload<{
    include: {
        discount: true,
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
}>;

export const getPaymentOrder = async (id: string): Promise<PaymentOrderWithProducInfo | null> => {
    const paymentOrder = await prisma.paymentOrder.findUnique({
        where: {
            id: id
        },
        include: {
            products: {
                include: {
                    product: {
                        include: {
                            product: {
                                include: {
                                    discount: true,
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
                            },
                            size: true
                        }
                    }
                }
            }
        }
    });

    return paymentOrder;
};

export const getUpdatedPaymentOrder = async (id: string, vipps: boolean): Promise<PaymentOrderWithProductsWithFullInfo | null> => {
    const order = await prisma.paymentOrder.findUnique({
        where: {
            id: id
        },
        select: {
            accessToken: true,
            expiresAt: true
        }
    });

    if (!order) {
        return null;
    }

    let existingAccessToken = order.accessToken!;
    let existingExpiresAt = order.expiresAt!;

    const isValid = isValidVippsToken(existingExpiresAt);

    if (!isValid) {
        const { accessToken, expiresAt } = await getVippsToken();
        existingAccessToken = accessToken;
        existingExpiresAt = expiresAt;
    }

    const paymentStatus = await getVippsPaymentStatus(id, existingAccessToken);

    const updatedOrder = await prisma.paymentOrder.update({
        where: {
            id: id
        },
        data: {
            status: paymentStatus,
            accessToken: existingAccessToken,
            expiresAt: existingExpiresAt
        },
        include: {
            products: {
                include: {
                    product: {
                        include: {
                            product: {
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
                            }
                        }
                    }
                }
            }
        }
    });

    if (vipps && !updatedOrder.updatedStock && paymentStatus === OrderStatus.SALE) {
        await createNotification(
            'Betaling gjennomført',
            'Betalingen din er gjennomført og ordren din er sendt til selger. Du har også mottatt en e-post med ordrebekreftelse. Ditt ordrenummer er ' + updatedOrder.id + '.'
        );
    }

    if (vipps && !updatedOrder.updatedStock && paymentStatus !== OrderStatus.SALE) {
        const createdProducts = updatedOrder.products;

        for (let i = 0; i < createdProducts.length; i++) {
            const variantProduct = createdProducts[i].product;
            await increaseProductVariantStock(variantProduct.id);
            const product = createdProducts[i].product.product;
            await increaseProductStock(product.id);
        }

        await prisma.paymentOrder.update({
            where: {
                id: id
            },
            data: {
                updatedStock: true
            }
        });
    }

    return updatedOrder;
};

export const getTotalMonthlyOrders = async (year: number, month: number): Promise<number> => {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const totalOrders = await prisma.paymentOrder.count({
        where: {
            createdAt: {
                gte: startDate,
                lt: endDate
            }
        }
    });

    return totalOrders;
};

export const getTotalMonthlyProducts = async (year: number, month: number): Promise<number> => {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const orders = await prisma.paymentOrder.findMany({
        where: {
            createdAt: {
                gte: startDate,
                lt: endDate
            }
        },
        include: {
            products: true
        }
    });

    let total = 0;
    for (const order of orders) {
        total += order.products.length;
    }

    return total;
};

export const getTotalMonthlyRevenue = async (year: number, month: number): Promise<number> => {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const orders = await prisma.paymentOrder.findMany({
        where: {
            createdAt: {
                gte: startDate,
                lt: endDate
            }
        }
    });

    let total = 0;
    for (const order of orders) {
        total += order.total_price;
    }

    return total;
};

export type PaymentOrderWithUser = PaymentOrder & {
    user: User
};

export const getLatestOrders = async (take: number): Promise<PaymentOrderWithUser[]> => {
    const orders = await prisma.paymentOrder.findMany({
        include: {
            user: true
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: take
    });

    return orders;
};

export const getOrders = async (skip: number, take: number, search: string): Promise<PaymentOrderWithUser[]> => {
    const orders = await prisma.paymentOrder.findMany({
        where: {
            OR: [
                {
                    id: search
                },
                {
                    user: {
                        name: {
                            contains: search
                        }
                    }
                }
            ]
        },
        include: {
            user: true
        },
        orderBy: {
            createdAt: 'desc'
        },
        take,
        skip
    });

    return orders;
};

export const getOrderCount = async (search: string): Promise<number> => {
    const count = await prisma.paymentOrder.count({
        where: {
            OR: [
                {
                    id: search
                },
                {
                    user: {
                        name: {
                            contains: search
                        }
                    }
                }
            ]
        }
    });

    return count;
};

export const getUserProductTransactions = async (userId: string, skip: number, take: number): Promise<PaymentOrderWithUser[]> => {
    const orders = await prisma.paymentOrder.findMany({
        where: {
            userId: userId
        },
        include: {
            user: true
        },
        orderBy: {
            createdAt: 'desc'
        },
        take,
        skip
    });

    return orders;
};

export const updatePaymentOrderStatus = async (id: string, status: OrderStatus): Promise<void> => {
    await prisma.paymentOrder.update({
        where: {
            id: id
        },
        data: {
            status: status
        }
    });
};

export const getPaymentOrderAccessToken = async (id: string): Promise<{ accessToken: string, expiresAt: string } | null> => {
    const order = await prisma.paymentOrder.findUnique({
        where: {
            id: id
        },
        select: {
            accessToken: true,
            expiresAt: true
        }
    });

    if (
        !order ||
        !order.accessToken ||
        !order.expiresAt
    ) return null;

    return {
        accessToken: order.accessToken,
        expiresAt: order.expiresAt
    }
};

export const updatePaymentOrderAccessToken = async (id: string, accessToken: string, expiresAt: string): Promise<void> => {
    await prisma.paymentOrder.update({
        where: {
            id: id
        },
        data: {
            accessToken: accessToken,
            expiresAt: expiresAt
        }
    });
};

export const getPaymentOrderAmount = async (id: string): Promise<number> => {
    const order = await prisma.paymentOrder.findUnique({
        where: {
            id: id
        },
        select: {
            total_price: true
        }
    });

    if (!order) {
        return 0;
    }

    return order.total_price;
};
