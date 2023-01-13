import * as React from "react";
import { Dispatch } from "redux";
import * as Thunk from "redux-thunk";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { configuredApi } from "../../config";
import { State } from "../state";
import { CartActions } from "../actions";
import { AddItem } from "../../api";

type CartIdDispatch = Thunk.ThunkDispatch<State, any, CartActions>; 

export const useUpdateCart = (products: AddItem) => {
    const state = useSelector<State, State["cartId"]>((state) => state.cartId, shallowEqual);
    const dispatch: CartIdDispatch = useDispatch();
    React.useEffect(() => {
        dispatch(async (dispatch: Dispatch<CartActions>, getState) => {
            const cartId = getState().cartId;
            if (!cartId.response) {
                throw "Cart not initialized!";
            }
            await configuredApi.carts.updateCart(cartId.response.id, products);
            dispatch({
                type: "clearCart",
            });

        });
    }, [dispatch, products]);
    return state;
};
