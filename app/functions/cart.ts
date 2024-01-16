import { CartProduct } from "../providers";


export const addToLocalCart = (product: CartProduct) => {
    const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingProduct: CartProduct = localCart.find((item: CartProduct) => item.variantId === product.variantId);

    if (existingProduct) {
        const newCart = localCart.filter((item: CartProduct) => item.variantId !== existingProduct.variantId);
        existingProduct.count += 1;
        newCart.push(existingProduct);
        localStorage.setItem('cart', JSON.stringify(newCart));
    } else {
        localCart.push({ ...product, count: 1 });
        localStorage.setItem('cart', JSON.stringify(localCart));
    }

};

export const removeFromLocalCart = (product: CartProduct) => {
    const localCart: CartProduct[] = JSON.parse(localStorage.getItem('cart') || '[]');

    const existingProduct: CartProduct | undefined = localCart.find((item: CartProduct) => item.variantId === product.variantId);

    if (existingProduct && existingProduct.count > 1) {
        const newCart = localCart.filter((item: CartProduct) => item.variantId !== existingProduct.variantId);
        existingProduct.count -= 1;
        newCart.push(existingProduct);
        localStorage.setItem('cart', JSON.stringify(newCart));
    } else {
        const newCart = localCart.filter((item: CartProduct) => item.variantId !== product.variantId);
        localStorage.setItem('cart', JSON.stringify(newCart));
    }
};

export const emptyLocalCart = () => {
    localStorage.removeItem('cart');
};

export const addToCart = (product: CartProduct, cart: CartProduct[]) => {
    const existingProduct: CartProduct | undefined = cart.find((item: CartProduct) => item.variantId === product.variantId);

    if (existingProduct) {
        const newCart = cart.filter((item: CartProduct) => item.variantId !== existingProduct.variantId);
        existingProduct.count += 1;
        newCart.push(existingProduct);
        return newCart;
    } 
    
    const newCart = [...cart, { ...product, count: 1 }];

    return newCart;
};

export const removeFromCart = (product: CartProduct, cart: CartProduct[]) => {
    const existingProduct: CartProduct | undefined = cart.find((item: CartProduct) => item.variantId === product.variantId);

    if (existingProduct && existingProduct.count > 1) {
        const newCart = cart.filter((item: CartProduct) => item.variantId !== existingProduct.variantId);
        existingProduct.count -= 1;
        newCart.push(existingProduct);
        return newCart;
    } 

    cart = cart.filter((item: CartProduct) => item.variantId !== product.variantId);

    return cart;
};
