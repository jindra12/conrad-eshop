import * as React from "react";
import { Dispatch } from "redux";
import * as Thunk from "redux-thunk";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { configuredApi } from "../../config";
import { State } from "../state";
import { CartActions, CartIdActions } from "../actions";
import { AddItem } from "../../api";
import { createError, createLoaded } from "../../utils/loadable";

type CartIdDispatch = Thunk.ThunkDispatch<State, any, CartActions>; 

export const useUpdateCart = (products: AddItem) => {
    const state = useSelector<State, State["cartId"]>((state) => state.cartId, shallowEqual);
    const dispatch: CartIdDispatch = useDispatch();
    React.useEffect(() => {
        dispatch(async (dispatch: Dispatch<CartActions | CartIdActions>, getState) => {
            if (products.products.length === 0) {
                return;
            }
            const cartId = getState().cartId;
            if (!cartId.response) {
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
            } else {
                await configuredApi.carts.updateCart(cartId.response.id, products);
            }
        });
    }, [dispatch, products]);
    return state || {};
};
