import { CartItem, CartResult } from "../api";

/**
 * Reduces all carts from API into a single line of products
 */
export const getCartItems = (carts: CartResult[]) => carts.reduce((products: CartItem[], cart) => {
    products.push(...cart.products);
    return products;
}, []);
