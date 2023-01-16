import { simpleReducerFactory } from "./simpleReducer";

/**
 * Product category API reducer
 */
export const categoriesReducer = simpleReducerFactory<string[]>("categories", "loadCategories", "setCategories", "errorCategories", "clearCategories");