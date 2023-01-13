import { ProductsByCategory } from "../actions";
import { initialState } from "../state";

export const productsByCategoryReducer = (state = initialState["productsByCategory"], action: ProductsByCategory) => {
    switch (action.type) {
        case "loadProductsByCategory":
            return {
                ...state,
                [action.payload.id]: {
                    isLoading: true,
                }
            };
        case "setProductsByCategory":
            return {
                ...state,
                [action.payload.id]: {
                    response: action.payload.response,
                },
            };
        case "errorProductsByCategory":
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