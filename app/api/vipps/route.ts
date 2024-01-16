import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";
import { v4 as uuidv4 } from 'uuid';
import { NextRequest, NextResponse } from "next/server";
import { isLoggedIn } from "../middleware/auth";
import prisma from "@/prisma/client";
import { convertToVippsPrice, getVippsPaymentData, getVippsToken, isValidVippsToken } from "./utils";
import { CartProduct } from "@/app/providers";
import { decreaseProductStock } from "@/app/db/product";
import { decreaseProductVariantStock } from "@/app/db/stock";


export const POST = async (request: NextRequest) => {
    const session = await getServerSession(authOptions);

    if (!isLoggedIn(session)) {
        return NextResponse.json({ message: "Du er ikke innlogget." }, { status: 401 });
    }

    const body = await request.json();

    const products: CartProduct[] = body.products;

    if (!products || products.length <= 0) {
        return NextResponse.json({ message: "Ingen produkter å betale." }, { status: 400 });
    }

    try {

        const { accessToken, expiresAt } = await getVippsToken();

        if (!isValidVippsToken(expiresAt)) {
            return NextResponse.json({ message: 'Dette skjedde en feil med opprettelsen av vippsbetaling' }, { status: 500 });
        }

        const paymentPrice = convertToVippsPrice(products);

        if (paymentPrice <= 0) {
            return NextResponse.json({ message: "Prisen for orderen kan ikke være 0." }, { status: 400 });
        };

        const user = await prisma.user.findUnique({
            where: {
                email: session!.user!.email!
            }
        });

        if (!user) {
            return NextResponse.json({ message: "Bruker ikke funnet." }, { status: 404 });
        };

        const orderId = uuidv4();

        const data = await getVippsPaymentData(orderId, paymentPrice, accessToken);

        const paymentOrder = await prisma.paymentOrder.create({
            data: {
                id: orderId,
                payment_url: data.url,
                userId: user.id,
                total_price: paymentPrice / 100,
                accessToken: accessToken,
                expiresAt: expiresAt,
                products: {
                    create: products.map((product) => ({
                        productId: product.variantId,
                        product_count: product.count
                    }))
                }
            },
            include: {
                products: {
                    include: {
                        product: {
                            include: {
                                product: true
                            }
                        }
                    }
                }
            }
        });

        const createdProducts = paymentOrder.products;

        

        for (let i = 0; i < createdProducts.length; i++) {
            const variantProduct = createdProducts[i].product;
            await decreaseProductVariantStock(variantProduct.id);
            const product = createdProducts[i].product.product;
            await decreaseProductStock(product.id);
        }

        
        return NextResponse.json(data, { status: 200 });
    } catch (e) {
        return NextResponse.json({ message: "Noe gikk galt med initieringen av VIPPS betaling." }, { status: 500 });
    }
};