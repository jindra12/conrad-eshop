import { combineReducers } from "redux";
import { cartReducer } from "./cart";
import { cartIdReducer } from "./cartId";
import { categoriesReducer } from "./categories";
import { productsReducer } from "./products";
import { productsByCategoryReducer } from "./productsByCategories";
import { productsByIdReducer } from "./productsById";

export default combineReducers({
    products: productsReducer,
    productsById: productsByIdReducer,
    categories: categoriesReducer,
    productsByCategory: productsByCategoryReducer,
    cart: cartReducer,
    cartId: cartIdReducer,
});