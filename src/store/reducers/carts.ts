import { CartsActions } from "../actions";
import { initialState, State } from "../state";

export const cartsReducer = (state = initialState, action: CartsActions): State => {
    switch (action.type) {
        case "loadCarts":
            return {
                ...state,
                carts: {
                    ...state.carts,
                    [action.payload.id[0]]: {
                        ...state.carts[action.payload.id[0]],
                        [action.payload.id[1]]: {
                            isLoading: true,
                        },
                    },
                },
            };
        case "setCarts":
            return {
                ...state,
                carts: {
                    ...state.carts,
                    [action.payload.id[0]]: {
                        ...state.carts[action.payload.id[0]],
                        [action.payload.id[1]]: {
                            response: action.payload.response
                        },
                    },
                },
            };
        case "errorCarts":
            return {
                ...state,
                carts: {
                    ...state.carts,
                    [action.payload.id[0]]: {
                        ...state.carts[action.payload.id[0]],
                        [action.payload.id[1]]: {
                            error: action.payload.error
                        },
                    },
                },
            };
        default:
            return state
    }
};