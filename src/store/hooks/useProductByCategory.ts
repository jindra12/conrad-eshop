import * as React from "react";
import { Dispatch } from "redux";
import * as Thunk from "redux-thunk";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { createError, createLoaded, Loadable } from "../../utils/loadable";
import { configuredApi } from "../../config";
import { Product } from "../../api";
import { State } from "../state";
import { ProductsByCategory } from "../actions";

type ProductsByCategoryDispatch = Thunk.ThunkDispatch<State, any, ProductsByCategory>; 

export const useProductsByCategory = (category: string) => {
    const state = useSelector<State, Record<string, Loadable<Product[]>>>((state) => state.productsByCategory, shallowEqual);
    const dispatch: ProductsByCategoryDispatch = useDispatch();
    React.useEffect(() => {
        dispatch(async (dispatch: Dispatch<ProductsByCategory>, getState) => {
            const products = getState().productsByCategory[category];
            if (products && (products.isLoading || products.response)) {
                return;
            }
            dispatch({
                type: "loadProductsByCategory",
                payload: {
                    id: category,
                },
            });
            try {
                dispatch({
                    type: "setProductsByCategory",
                    payload: {
                        id: category,
                        ...(await createLoaded(await configuredApi.products.getProductsInCategory(category))),
                    },
                })
            } catch (e) {
                dispatch({
                    type: "errorProductsByCategory",
                    payload: {
                        id: category,
                        ...createError(e),
                    },
                })
            }
        });
    }, [dispatch]);
    return state[category] || {};
};
