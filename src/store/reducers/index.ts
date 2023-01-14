import { combineReducers } from "redux";
import { cartReducer } from "./carts";
import { categoriesReducer } from "./categories";
import { productsReducer } from "./products";
import { productsByCategoryReducer } from "./productsByCategories";
import { productsByIdReducer } from "./productsById";

export default combineReducers({
    products: productsReducer,
    productsById: productsByIdReducer,
    categories: categoriesReducer,
    productsByCategory: productsByCategoryReducer,
    carts: cartReducer,
});