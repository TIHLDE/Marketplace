

const SELLER = new Map();
SELLER.set('sosialen', {
    name: 'Sosialen',
    email: 'sosialen@tihlde.org'
});
SELLER.set('hovedstyret', {
    name: 'Hovedstyret',
    email: 'hs@tihlde.org'
});
SELLER.set('promo', {
    name: 'Promo',
    email: 'promo@tihlde.org'
});
SELLER.set('nok', {
    name: 'Næringsliv og Kurs',
    email: 'nok@tihlde.org'
});
SELLER.set('index', {
    name: 'Index',
    email: 'index@tihlde.org'
});
SELLER.set('kok', {
    name: 'Kiosk og Kontor',
    email: 'kok@tihlde.org'
});
SELLER.set('annen', {
    name: 'Annen',
    email: 'hs@tihlde.org'
});



export const allSellers: { key: string, value: string }[] = Array.from(SELLER.entries(), ([key, seller]) => ({ key, value: seller.name }));
export const sellerNames: string[] = Array.from(SELLER.values(), seller => seller.name);
export const sellerKeys: string[] = Array.from(SELLER.keys());

export default SELLER;