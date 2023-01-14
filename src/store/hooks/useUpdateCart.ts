import * as React from "react";
import { Dispatch } from "redux";
import * as Thunk from "redux-thunk";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { configuredApi } from "../../config";
import { State } from "../state";
import { CartActions } from "../actions";
import { AddItem } from "../../api";
import { createLoaded } from "../../utils/loadable";

type CartIdDispatch = Thunk.ThunkDispatch<State, any, CartActions>;

export const useUpdateCart = (products: AddItem) => {
    const state = useSelector<State, State["cart"]>(
        (state) => state.cart,
        shallowEqual
    );
    const dispatch: CartIdDispatch = useDispatch();
    React.useEffect(() => {
        dispatch(async (dispatch: Dispatch<CartActions>, getState) => {
            if (products.products.length === 0) {
                return;
            }
            const carts = getState().cart;
            const cartId = carts.response?.[0]?.id;
            if (!cartId) {
                const newId = await createLoaded(await configuredApi.carts.createCart(products));
                dispatch({
                    type: "setCart",
                    payload: {
                        response: [{
                            ...products,
                            ...newId.response,
                        }],
                    },
                });
            } else {
                await configuredApi.carts.updateCart(cartId, products);
            }
        });
    }, [dispatch, products]);
    return state || {};
};
