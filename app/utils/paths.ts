

export interface PathProps {
    title: string;
    href: string;
};

const HOME_PATH = '/';
const PRODUCTS_PATH  = '/products';

export const PRODUCT_VIEW_PAGE_PATHS: PathProps[] = [
    { title: 'Hjem', href: HOME_PATH },
    { title: 'Produkter', href: PRODUCTS_PATH }
];

const ADMIN_PATH = '/admin';
const ADMIN_EVENTS_PATH = `${ADMIN_PATH}/events`;
const ADMIN_EVENTS_TRANSACTIONS_PATH = `${ADMIN_EVENTS_PATH}/transactions`;
const ADMIN_STATS_PATH = `${ADMIN_PATH}/stats`;
const ADMIN_PRODUCTSTATS_PATH = `${ADMIN_STATS_PATH}/products`;
const ADMIN_PRODUCT_TRANSACTIONS_PATH = `${ADMIN_PRODUCTSTATS_PATH}/transactions`;
const ADMIN_DASHBOARD_PATH = `${ADMIN_PATH}/dashboard`;
const ADMIN_USER_PATH = `${ADMIN_PATH}/user`;
const ADMIN_PRODUCT_PATH = `${ADMIN_PATH}/product`;
const ADMIN_PRODUCT_NEW_PATH = `${ADMIN_PRODUCT_PATH}/new`;
const ADMIN_CATEGORY_PATH = `${ADMIN_PATH}/category`;
const ADMIN_CATEGORY_NEW_PATH = `${ADMIN_CATEGORY_PATH}/new`;
const ADMIN_CATEGORY_EDIT_PATH = `${ADMIN_CATEGORY_PATH}/edit`;
const ADMIN_DISCOUNT_PATH = `${ADMIN_PATH}/discount`;
const ADMIN_DISCOUNT_NEW_PATH = `${ADMIN_DISCOUNT_PATH}/new`;
const ADMIN_SIZE_PATH = `${ADMIN_PATH}/size`;

export const ADMIN_EVENTS_TRANSACTIONS_PATHS: PathProps[] = [
    { title: 'Dashboard', href: ADMIN_PATH },
    { title: 'Transaksjoner', href: ADMIN_EVENTS_TRANSACTIONS_PATH }
];

export const ADMIN_USER_PAGE_PATHS: PathProps[] = [
    { title: 'Dashboard', href: ADMIN_PATH },
    { title: 'Brukere', href: ADMIN_USER_PATH }
];

export const getEventTransactionPagePaths = (name: string, order_id: string): PathProps[] => {
    return [
        { title: 'Dashboard', href: ADMIN_PATH },
        { title: 'Transaksjoner', href: ADMIN_EVENTS_TRANSACTIONS_PATH },
        { title: name, href: `${ADMIN_EVENTS_TRANSACTIONS_PATH}/${order_id}` }
    ];
};  

export const getUserPagePaths = (id: string): PathProps[] => {
    return [
        { title: 'Dashboard', href: ADMIN_PATH },
        { title: 'Brukere', href: ADMIN_USER_PATH },
        { title: 'Bruker', href: `${ADMIN_USER_PATH}/${id}` }
    ];
};

export const getUserProductTransactionsPagePaths = (id: string): PathProps[] => {
    return [
        { title: 'Dashboard', href: ADMIN_PATH },
        { title: 'Brukere', href: ADMIN_USER_PATH },
        { title: 'Bruker', href: `${ADMIN_USER_PATH}/${id}` },
        { title: 'Produkttransaksjoner', href: `${ADMIN_USER_PATH}/${id}/products` }
    ];
};

export const ADMIN_PRDUCT_TRANSACTIONS_PAGE_PATHS: PathProps[] = [
    { title: 'Dashboard', href: ADMIN_PATH },
    { title: 'Statistikk', href: ADMIN_STATS_PATH },
    { title: 'Produktstatistikk', href: ADMIN_PRODUCTSTATS_PATH },
    { title: 'Transaksjoner', href: ADMIN_PRODUCT_TRANSACTIONS_PATH }
];

export const ADMIN_PROUDCTSTATS_PAGE_PATHS: PathProps[] = [
    { title: 'Dashboard', href: ADMIN_PATH },
    { title: 'Statistikk', href: ADMIN_STATS_PATH },
    { title: 'Produktstatistikk', href: ADMIN_PRODUCTSTATS_PATH }
];

export const getProductTransactionEditPagePaths = (id: string): PathProps[] => {
    return [
        { title: 'Dashboard', href: ADMIN_PATH },
        { title: 'Statistikk', href: ADMIN_STATS_PATH },
        { title: 'Produktstatistikk', href: ADMIN_PRODUCTSTATS_PATH },
        { title: 'Transaksjoner', href: ADMIN_PRODUCT_TRANSACTIONS_PATH },
        { title: 'Transaksjon', href: `${ADMIN_PRODUCT_TRANSACTIONS_PATH}/${id}` }
    ];
};

export const PRODUCT_PAGE_PATHS: PathProps[] = [
    { title: 'Dashboard', href: ADMIN_PATH },
    { title: 'Produkter', href: ADMIN_PRODUCT_PATH }
];

export const PRODUCT_NEW_PAGE_PATHS: PathProps[] = [
    { title: 'Dashboard', href: ADMIN_PATH },
    { title: 'Produkter', href: ADMIN_PRODUCT_PATH },
    { title: 'Nytt produkt', href: ADMIN_PRODUCT_NEW_PATH }
];

export const getProductEditPagePaths = (id: string): PathProps[] => {
    return [
        { title: 'Dashboard', href: ADMIN_PATH },
        { title: 'Produkter', href: ADMIN_PRODUCT_PATH },
        { title: 'Rediger produkt', href: `${ADMIN_PRODUCT_PATH}/${id}` }
    ];
};

export const CATEGORY_PAGE_PATHS: PathProps[] = [
    { title: 'Dashboard', href: ADMIN_PATH },
    { title: 'Kategorier', href: ADMIN_CATEGORY_PATH }
];

export const CATEGORY_NEW_PAGE_PATHS: PathProps[] = [
    { title: 'Dashboard', href: ADMIN_PATH },
    { title: 'Kategorier', href: ADMIN_CATEGORY_PATH },
    { title: 'Ny kategori', href: ADMIN_CATEGORY_NEW_PATH }
];

export const CATEGORY_EDIT_PAGE_PATHS: PathProps[] = [
    { title: 'Dashboard', href: ADMIN_PATH },
    { title: 'Kategorier', href: ADMIN_CATEGORY_PATH },
    { title: 'Rediger kategori', href: ADMIN_CATEGORY_PATH }
];

export const DISCOUNT_PAGE_PATHS: PathProps[] = [
    { title: 'Dashboard', href: ADMIN_PATH },
    { title: 'Rabatter', href: ADMIN_DISCOUNT_PATH }
];

export const DISCOUNT_NEW_PAGE_PATHS: PathProps[] = [
    { title: 'Dashboard', href: ADMIN_PATH },
    { title: 'Rabatter', href: ADMIN_DISCOUNT_PATH },
    { title: 'Ny rabatt', href: ADMIN_DISCOUNT_NEW_PATH }
];

export const getDiscountEditPagePaths = (id: string): PathProps[] => {
    return [
        { title: 'Dashboard', href: ADMIN_PATH },
        { title: 'Rabatter', href: ADMIN_DISCOUNT_PATH },
        { title: 'Rediger rabatt', href: `${ADMIN_DISCOUNT_PATH}/${id}` }
    ];
};

export const SIZE_PAGE_PATHS: PathProps[] = [
    { title: 'Dashboard', href: ADMIN_PATH },
    { title: 'Størrelser', href: ADMIN_SIZE_PATH }
];

export const SIZE_NEW_PAGE_PATHS: PathProps[] = [
    { title: 'Dashboard', href: ADMIN_PATH },
    { title: 'Størrelser', href: ADMIN_SIZE_PATH },
    { title: 'Ny størrelse', href: `${ADMIN_SIZE_PATH}/new` }
];

export const SIZE_EDIT_PAGE_PATHS: PathProps[] = [
    { title: 'Dashboard', href: ADMIN_PATH },
    { title: 'Størrelser', href: ADMIN_SIZE_PATH },
    { title: 'Rediger størrelse', href: ADMIN_SIZE_PATH }
];

export const getSizeEditPagePaths = (id: string): PathProps[] => {
    return [
        { title: 'Dashboard', href: ADMIN_PATH },
        { title: 'Størrelser', href: ADMIN_SIZE_PATH },
        { title: 'Rediger størrelse', href: `${ADMIN_SIZE_PATH}/${id}` }
    ];
};
