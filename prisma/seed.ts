/* eslint-disable no-restricted-imports */
import getRandomElement from "@/app/utils/array";
import prisma from "./client";
import { IS_PRODUCTION } from "./serverEnv";
import { sellerKeys } from "@/app/utils/seller";


const seed = async () => {
    if (IS_PRODUCTION) throw Error('Seed is not allowed in production');

    console.log('🌱 Seeding...');
    console.time(`🌱 Database has been seeded`);

    console.time('🧹 Cleaned up the database...');
    await prisma.user.deleteMany();
    await prisma.size.deleteMany();
    await prisma.product.deleteMany();
    await prisma.productCategory.deleteMany();
    await prisma.discount.deleteMany();
    await prisma.image.deleteMany();
    console.timeEnd('🧹 Cleaned up the database...');

    console.time('👨‍👨‍👦‍👦 Created users...');
    await prisma.user.createMany({
        data: [
            {
                tihlde_user_id: 'madsnyl',
                email: 'madsnyl@gmail.com',
                name: 'Mads Nylund',
                role: 'SUPERADMIN'
            },
            {
                tihlde_user_id: 'jan_tore',
                email: 'jan@tihlde.org',
                name: 'Jan Tore'
            },
            {
                tihlde_user_id: 'tor_ivar',
                email: 'tor@tihlde.org',
                name: 'Tor Ivar'
            },
            {
                tihlde_user_id: 'heidi_klum',
                email: 'heidi@tihlde.org',
                name: 'Heidi Klum'
            },
            {
                tihlde_user_id: 'jennifer_aniston',
                email: 'jennifer@tihlde.org',
                name: 'Jennifer Aniston'
            },
            {
                tihlde_user_id: 'jennifer_lopez',
                email: 'lopez@tihlde.org',
                name: 'Jennifer Lopez'
            },
            {
                tihlde_user_id: 'jennifer_lawrence',
                email: 'lawrence@tihlde.org',
                name: 'Jennifer Lawrence'
            },
            {
                tihlde_user_id: 'leonardo_dicaprio',
                email: 'dicaprio@tihlde.org',
                name: 'Leonardo DiCaprio'
            },
            {
                tihlde_user_id: 'tom_cruise',
                email: 'tom@tihlde.org',
                name: 'Tom Cruise'
            },
            {
                tihlde_user_id: 'tom_hanks',
                email: 'hanks@tihlde.org',
                name: 'Tom Hanks'
            },
            {
                tihlde_user_id: 'tom_hardy',
                email: 'hardy@tihlde.org',
                name: 'Tom Hardy'
            },
        ]
    });
    console.timeEnd('👨‍👨‍👦‍👦 Created users...');

    console.time('👕 Created sizes...');
    await prisma.size.createMany({
        data: [
            {
                id: 'clquzgh5i000108jr1ixncqjs',
                name: 'Small',
                value: 'S'
            },
            {
                id: 'clquzgh5i000208jr1q1q2q2q',
                name: 'Medium',
                value: 'M'
            },
            {
                id: 'clquzgh5i000308jr1x1x1x1x',
                name: 'Large',
                value: 'L'
            },
            {
                id: 'clquzgh5i000408jr1x1x1x1x',
                name: 'Xtra Large',
                value: 'XL'
            },
            {
                id: 'clquzgh5i000508jr1x1x1x1x',
                name: 'One Size',
                value: 'One Size'
            }
        ]
    });
    console.timeEnd('👕 Created sizes...');

    console.time('👕 Created product categories...');
    await prisma.productCategory.createMany({
        data: [
            {
                id: 'clquzgh5i000608jr1x1x1x1x',
                name: 'Klesplagg',
                description: 'Klesplagg'
            },
            {
                id: 'clquzgh5i000708jr1x1x1x1x',
                name: 'Tilbehør',
                description: 'Tilbehør'
            },
            {
                id: 'clquzgh5i000808jr1x1x1x1x',
                name: 'Diverse',
                description: 'Diverse'
            }
        ]
    });
    console.timeEnd('👕 Created product categories...');

    console.time('👕 Created discounts...');
    await prisma.discount.createMany({
        data: [
            {
                id: 'clquzgh5i000908jr1x1x1x1x',
                name: 'Student',
                description: 'Studentrabatt',
                discount_percent: 20
            },
            {
                id: 'clquzgh5i001008jr1x1x1x1x',
                name: 'Tihlde',
                description: 'Tihlde-rabatt',
                discount_percent: 10
            },
            {
                id: 'clquzgh5i001108jr1x1x1x1x',
                name: 'Bursdag',
                description: 'Bursdagsrabatt',
                discount_percent: 50
            },
            {
                id: 'clquzgh5i001208jr1x1x1x1x',
                name: 'Kampanje',
                description: 'Kampanjerabatt',
                discount_percent: 25
            }
        ]
    });
    console.timeEnd('👕 Created discounts...');

    console.time('👕 Created products...');
    await prisma.product.createMany({
        data: [
            {
                id: 'clquzgh5i001308jr1x1x1x1x',
                name: 'T-skjorte',
                description: 'T-skjorte med TIHLDE logo',
                price: 200,
                seller: getRandomElement(sellerKeys),
                preOrder: true,
                total_stock: 100,
                current_stock: 100,
                featured: true,
                information: 'Hentes på kontoret',
                categoryId: 'clquzgh5i000608jr1x1x1x1x',
                discountId: 'clquzgh5i001008jr1x1x1x1x'
            },
            {
                id: 'clquzgh5i001408jr1x1x1x1x',
                name: 'Hettegenser',
                description: 'Hettegenser',
                price: 400,
                seller: getRandomElement(sellerKeys),
                preOrder: false,
                total_stock: 100,
                current_stock: 100,
                featured: false,
                information: 'Hentes på kontoret',
                categoryId: 'clquzgh5i000608jr1x1x1x1x'
            },
            {
                id: 'clquzgh5i001508jr1x1x1x1x',
                name: 'Kopp',
                description: 'Kopp',
                price: 100,
                seller: getRandomElement(sellerKeys),
                preOrder: false,
                featured: true,
                total_stock: 100,
                current_stock: 100,
                information: 'Hentes på kontoret',
                categoryId: 'clquzgh5i000808jr1x1x1x1x'
            },
            {
                id: 'clquzgh5i001608jr1x1x1x1x',
                name: 'Klistremerke',
                description: 'Klistremerke',
                price: 50,
                seller: getRandomElement(sellerKeys),
                preOrder: false,
                featured: false,
                total_stock: 100,
                current_stock: 100,
                information: 'Hentes på kontoret',
                categoryId: 'clquzgh5i000808jr1x1x1x1x'
            },
            {
                id: 'clquzgh5i001708jr1x1x1x1x',
                name: 'Lommelerke',
                description: 'Lommelerke',
                price: 200,
                seller: getRandomElement(sellerKeys),
                preOrder: false,
                featured: true,
                total_stock: 100,
                current_stock: 100,
                information: 'Hentes på kontoret',
                categoryId: 'clquzgh5i000808jr1x1x1x1x'
            }
        ]
    });
    console.timeEnd('👕 Created products...');

    console.time('👕 Created stock...');
    await prisma.stock.createMany({
        data: [
            {
                id: 'clquzgh5i001808jr1x1x1x1x',
                productId: 'clquzgh5i001308jr1x1x1x1x',
                sizeId: 'clquzgh5i000108jr1ixncqjs',
                stock: 10,
                current_stock: 10
            },
            {
                id: 'clquzgh5i001908jr1x1x1x1x',
                productId: 'clquzgh5i001308jr1x1x1x1x',
                sizeId: 'clquzgh5i000208jr1q1q2q2q',
                stock: 10,
                current_stock: 10
            },
            {
                id: 'clquzgh5i002008jr1x1x1x1x',
                productId: 'clquzgh5i001308jr1x1x1x1x',
                sizeId: 'clquzgh5i000308jr1x1x1x1x',
                stock: 10,
                current_stock: 10
            },
            {
                id: 'clquzgh5i002108jr1x1x1x1x',
                productId: 'clquzgh5i001308jr1x1x1x1x',
                sizeId: 'clquzgh5i000408jr1x1x1x1x',
                stock: 10,
                current_stock: 10
            },
            {
                id: 'clquzgh5i002208jr1x1x1x1x',
                productId: 'clquzgh5i001308jr1x1x1x1x',
                sizeId: 'clquzgh5i000508jr1x1x1x1x',
                stock: 10,
                current_stock: 10
            },
            {
                id: 'clquzgh5i002308jr1x1x1x1x',
                productId: 'clquzgh5i001408jr1x1x1x1x',
                sizeId: 'clquzgh5i000108jr1ixncqjs',
                stock: 10,
                current_stock: 10
            },
            {
                id: 'clquzgh5i002408jr1x1x1x1x',
                productId: 'clquzgh5i001408jr1x1x1x1x',
                sizeId: 'clquzgh5i000208jr1q1q2q2q',
                stock: 10,
                current_stock: 10
            },
            {
                id: 'clquzgh5i002508jr1x1x1x1x',
                productId: 'clquzgh5i001508jr1x1x1x1x',
                sizeId: 'clquzgh5i000508jr1x1x1x1x',
                stock: 10,
                current_stock: 10
            },
            {
                id: 'clquzgh5i002608jr1x1x1x1x',
                productId: 'clquzgh5i001708jr1x1x1x1x',
                sizeId: 'clquzgh5i000508jr1x1x1x1x',
                stock: 10,
                current_stock: 10
            },
            {
                id: 'clquzgh5i002708jr1x1x1x1x',
                productId: 'clquzgh5i001608jr1x1x1x1x',
                sizeId: 'clquzgh5i000508jr1x1x1x1x',
                stock: 10,
                current_stock: 10
            }
        ]
    });
    console.timeEnd('👕 Created stock...');

    console.timeEnd(`🌱 Database has been seeded`);
};

seed()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });