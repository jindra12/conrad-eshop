import { ProductsActions } from "../actions";
import { initialState, State } from "../state";

export const productsReducer = (state = initialState, action: ProductsActions): State => {
    switch (action.type) {
        case "loadProducts":
            return {
                ...state,
                products: { isLoading: true },
            };
        case "setProducts":
        case "errorProducts":
            return {
                ...state,
                products: action.payload,
            };
        default:
            return state
    }
};