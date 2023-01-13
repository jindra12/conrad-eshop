import * as React from "react";
import { Dispatch } from "redux";
import * as Thunk from "redux-thunk";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { createError, createLoaded, Loadable } from "../../utils/loadable";
import { configuredApi } from "../../config";
import { Product } from "../../api";
import { State } from "../state";
import { ProductsByIdActions } from "../actions";

type ProductsByIdDispatch = Thunk.ThunkDispatch<State, any, ProductsByIdActions>; 

export const useProductById = (id: number) => {
    const state = useSelector<State, Record<string, Loadable<Product>>>((state) => state.productsById, shallowEqual);
    const dispatch: ProductsByIdDispatch = useDispatch();
    React.useEffect(() => {
        dispatch(async (dispatch: Dispatch<ProductsByIdActions>, getState) => {
            const product = getState().productsById[id];
            if (product && (product.isLoading || product.response)) {
                return;
            }
            dispatch({
                type: "loadProductsById",
                payload: {
                    id: id.toString(),
                },
            });
            try {
                dispatch({
                    type: "setProductsById",
                    payload: {
                        id: id.toString(),
                        ...(await createLoaded(await configuredApi.products.getProduct(id))),
                    },
                })
            } catch (e) {
                dispatch({
                    type: "errorProductsById",
                    payload: {
                        id: id.toString(),
                        ...createError(e),
                    },
                })
            }
        });
    }, [dispatch]);
    return state[id] || {};
};
