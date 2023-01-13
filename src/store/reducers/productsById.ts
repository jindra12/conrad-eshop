import { ProductsByIdActions } from "../actions";
import { initialState, State } from "../state";

export const productsByIdReducer = (state = initialState, action: ProductsByIdActions): State => {
    switch (action.type) {
        case "loadProductsById":
            return {
                ...state,
                productsById: {
                    ...state.productsById,
                    [action.payload.id]: {
                        isLoading: true,
                    }
                },
            };
        case "setProductsById":
            return {
                ...state,
                productsById: {
                    ...state.productsById,
                    [action.payload.id]: {
                        response: action.payload.response,
                    },
                },
            };
        case "errorProductsById":
            return {
                ...state,
                productsById: {
                    ...state.productsById,
                    [action.payload.id]: {
                        error: action.payload.error,
                    }
                },
            };
        default:
            return state
    }
};