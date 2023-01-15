import * as React from "react";
import { Dispatch } from "redux";
import * as Thunk from "redux-thunk";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { configuredApi } from "../../config";
import { AddItem } from "../../api";
import { createLoaded } from "../../utils/loadable";
import { State } from "../state";
import { CartActions } from "../actions";

type CartIdDispatch = Thunk.ThunkDispatch<State, any, CartActions>;

export const useUpdateCart = (products: AddItem) => {
    const state = useSelector<State, State["cart"]>(
        (state) => state.cart,
        shallowEqual
    );
    const dispatch: CartIdDispatch = useDispatch();
    const isMounted = React.useRef<boolean>(false);
    React.useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            return;
        }
        dispatch(async (dispatch: Dispatch<CartActions>, getState) => {
            const cart = getState().cart;
            const cartId = cart.response?.[0]?.id;
            if (!cartId && products.products.length === 0) {
                return;
            }
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
