import { simpleReducerFactory } from "./simpleReducer";

/**
 * All products reducer
 */
export const productsReducer = simpleReducerFactory("products", "loadProducts", "setProducts", "errorProducts", "clearProducts");