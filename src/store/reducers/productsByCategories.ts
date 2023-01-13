import { ProductsByCategory } from "../actions";
import { initialState, State } from "../state";

export const productsByCategoryReducer = (state = initialState, action: ProductsByCategory): State => {
    switch (action.type) {
        case "loadProductsByCategory":
            return {
                ...state,
                productsByCategory: {
                    ...state.productsByCategory,
                    [action.payload.id]: {
                        isLoading: true,
                    }
                },
            };
        case "setProductsByCategory":
            return {
                ...state,
                productsByCategory: {
                    ...state.productsByCategory,
                    [action.payload.id]: {
                        response: action.payload.response,
                    },
                },
            };
        case "errorProductsByCategory":
            return {
                ...state,
                productsByCategory: {
                    ...state.productsByCategory,
                    [action.payload.id]: {
                        error: action.payload.error,
                    }
                },
            };
        default:
            return state
    }
};