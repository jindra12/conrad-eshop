import * as React from "react";
import { Dispatch } from "redux";
import * as Thunk from "redux-thunk";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { createError, createLoaded } from "../../utils/loadable";
import { configuredApi } from "../../config";
import { State } from "../state";
import { CartIdActions } from "../actions";
import { AddItem } from "../../api";

type CartIdDispatch = Thunk.ThunkDispatch<State, any, CartIdActions>; 

export const useCreateCart = (products: AddItem) => {
    const state = useSelector<State, State["cartId"]>((state) => state.cartId, shallowEqual);
    const dispatch: CartIdDispatch = useDispatch();
    React.useEffect(() => {
        dispatch(async (dispatch: Dispatch<CartIdActions>, getState) => {
            const cart = getState().cartId;
            if (cart.isLoading || cart.response) {
                return;
            }
            dispatch({
                type: "loadCartId",
            });
            try {
                dispatch({
                    type: "setCartId",
                    payload: await createLoaded(await configuredApi.carts.createCart(products)),
                });
            } catch (e) {
                dispatch({
                    type: "errorCartId",
                    payload: createError(e),
                });
            }
        });
    }, [dispatch, products]);
    return state;
};
