import { CategoryActions } from "../actions";
import { initialState, State } from "../state";

export const categoriesReducer = (state = initialState, action: CategoryActions): State => {
    switch (action.type) {
        case "loadCategories":
            return {
                ...state,
                categories: { isLoading: true },
            };
        case "setCategories":
        case "errorCategories":
            return {
                ...state,
                categories: action.payload,
            };
        default:
            return state
    }
};