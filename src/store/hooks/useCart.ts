import * as React from "react";
import { Dispatch } from "redux";
import * as Thunk from "redux-thunk";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { createError, createLoaded } from "../../utils/loadable";
import { configuredApi } from "../../config";
import { State } from "../state";
import { CartActions } from "../actions";

type CartDispatch = Thunk.ThunkDispatch<State, any, CartActions>; 

export const useCart = (userId: number) => {
    const state = useSelector<State, State["cart"]>((state) => state.cart, shallowEqual);
    const dispatch: CartDispatch = useDispatch();
    React.useEffect(() => {
        dispatch(async (dispatch: Dispatch<CartActions>) => {
            dispatch({
                type: "loadCart",
            });
            try {
                dispatch({
                    type: "setCart",
                    payload: await createLoaded(await configuredApi.carts.getProductsInCart(userId)),
                });
            } catch (e) {
                dispatch({
                    type: "errorCart",
                    payload: createError(e),
                });
            }
        });
    }, [dispatch, userId]);
    return state;
};
