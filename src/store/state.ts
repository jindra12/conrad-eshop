import { CartResult, Product } from "../api";
import { Loadable } from "../utils/loadable";

/**
 * Global redux state type
 */
export interface State {
    products: Loadable<Product[]>;
    productsById: Record<string, Loadable<Product>>;
    categories: Loadable<string[]>;
    productsByCategory: Record<string, Loadable<Product[]>>;
    cart: Loadable<CartResult[]>;
}

export const initialState: State = {
    products: {},
    productsById: {},
    categories: {},
    productsByCategory: {},
    cart: {},
};