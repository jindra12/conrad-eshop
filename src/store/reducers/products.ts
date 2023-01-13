import { simpleReducerFactory } from "./simpleReducer";

export const productsReducer = simpleReducerFactory("products", "loadProducts", "setProducts", "errorProducts", "clearProducts");