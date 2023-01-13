import { ProductsByIdActions } from "../actions";
import { initialState } from "../state";

export const productsByIdReducer = (state = initialState["productsById"], action: ProductsByIdActions) => {
    switch (action.type) {
        case "loadProductsById":
            return {
                ...state,
                [action.payload.id]: {
                    isLoading: true,
                },
            };
        case "setProductsById":
            return {
                ...state,
                [action.payload.id]: {
                    response: action.payload.response,
                },
            };
        case "errorProductsById":
            return {
                ...state,
                [action.payload.id]: {
                    error: action.payload.error,
                }
            };
        default:
            return state;
    }
};