import { simpleReducerFactory } from "./simpleReducer";

export const categoriesReducer = simpleReducerFactory<string[]>("categories", "loadCategories", "setCategories", "errorCategories", "clearCategories");