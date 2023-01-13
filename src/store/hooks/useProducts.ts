import * as React from "react";
import { Dispatch } from "redux";
import * as Thunk from "redux-thunk";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { createError, createLoaded, Loadable } from "../../utils/loadable";
import { configuredApi } from "../../config";
import { Product } from "../../api";
import { State } from "../state";
import { ProductsActions } from "../actions";

type ProductsDispatch = Thunk.ThunkDispatch<State, any, ProductsActions>; 

export const useProducts = () => {
    const state = useSelector<State, Loadable<Product[]>>((state) => state.products, shallowEqual);
    const dispatch: ProductsDispatch = useDispatch();
    React.useEffect(() => {
        dispatch(async (dispatch: Dispatch<ProductsActions>, getState) => {
            const products = getState().products;
            if (products.isLoading) {
                return;
            }
            dispatch({
                type: "loadProducts",
            });
            try {
                dispatch({
                    type: "setProducts",
                    payload: await createLoaded(await configuredApi.products.getProducts()),
                })
            } catch (e) {
                dispatch({
                    type: "errorProducts",
                    payload: createError(e),
                })
            }
        });
    }, [dispatch]);
    return state;
};
