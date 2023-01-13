import { Product, CartItem } from "../api";

export type ActionType = "loadProducts" | "setProducts" | "errorProducts" |
    "loadProductsById" | "setProductsById" | "errorProductsById" |
    "loadCategories" | "setCategories" | "errorCategories" |
    "loadProductsByCategory" | "setProductsByCategory" | "errorProductsByCategory" |
    "loadCarts" | "setCarts" | "errorCarts";

type SimpleActionBuilder<TPayload, TLoad, TSet, TError> = {
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
};

type ComplexActionBuilder<TPayload, TLoad, TSet, TError> = {
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
};

type TwoDimensionalActionBuilder<TPayload, TLoad, TSet, TError> = {
    type: TLoad;
    payload: {
        id: [string, string];
    };
} | {
    type: TError;
    payload: {
        error: object;
        id: [string, string];
    };
} | {
    type: TSet;
    payload: {
        response: TPayload;
        id: [string, string];
    };
};

export type ProductsActions = SimpleActionBuilder<Product[], "loadProducts", "setProducts", "errorProducts">;
export type ProductsByIdActions = ComplexActionBuilder<Product, "loadProductsById", "setProductsById", "errorProductsById">;
export type CategoryActions = SimpleActionBuilder<string[], "loadCategories", "setCategories","errorCategories">;
export type ProductsByCategory = ComplexActionBuilder<Product[], "loadProductsByCategory", "setProductsByCategory", "errorProductsByCategory">;
export type CartsActions = TwoDimensionalActionBuilder<CartItem[], "loadCarts", "setCarts", "errorCarts">;


