import { Product, Cart, CartResult } from "../api";

export type SimpleActionFactory<TPayload, TLoad, TSet, TError, TClear> = {
    type: TLoad;
} | {
    type: TError;
    payload: {
        error: object;
    };
} | {
    type: TSet;
    payload: {
        response: TPayload;
    }
} | {
    type: TClear;
};

type ComplexActionFactory<TPayload, TLoad, TSet, TError, TClear> = {
    type: TLoad;
    payload: {
        id: string;
    };
} | {
    type: TError;
    payload: {
        error: object;
        id: string;
    };
} | {
    type: TSet;
    payload: {
        response: TPayload;
        id: string;
    };
} | {
    type: TClear;
};

export type ProductsActions = SimpleActionFactory<Product[], "loadProducts", "setProducts", "errorProducts", "clearProducts">;
export type ProductsByIdActions = ComplexActionFactory<Product, "loadProductsById", "setProductsById", "errorProductsById", "clearProductsById">;
export type CategoryActions = SimpleActionFactory<string[], "loadCategories", "setCategories", "errorCategories", "clearCategories">;
export type ProductsByCategory = ComplexActionFactory<Product[], "loadProductsByCategory", "setProductsByCategory", "errorProductsByCategory", "clearProductsByCategory">;
export type CartActions = SimpleActionFactory<CartResult[], "loadCart", "setCart", "errorCart", "clearCart">;
export type CartIdActions = SimpleActionFactory<Cart, "loadCartId", "setCartId", "errorCartId", "clearCartId">;


