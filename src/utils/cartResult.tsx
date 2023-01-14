import { CartItem, CartResult } from "../api";

export const getCartItems = (carts: CartResult[]) => carts.reduce((products: CartItem[], cart) => {
    products.push(...cart.products);
    return products;
}, []);