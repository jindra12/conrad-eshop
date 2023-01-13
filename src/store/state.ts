import { Cart, CartItem, Product } from "../api";
import { Loadable } from "../utils/loadable";

export interface State {
    products: Loadable<Product[]>;
    productsById: Record<string, Loadable<Product>>;
    categories: Loadable<string[]>;
    productsByCategory: Record<string, Loadable<Product[]>>;
    cart: Loadable<CartItem[]>;
    cartId: Loadable<Cart>;
}

export const initialState: State = {
    products: {},
    productsById: {},
    categories: {},
    productsByCategory: {},
    cart: {},
    cartId: {},
};