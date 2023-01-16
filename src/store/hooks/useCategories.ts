import * as React from "react";
import { Dispatch } from "redux";
import * as Thunk from "redux-thunk";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { createError, createLoaded, Loadable } from "../../utils/loadable";
import { configuredApi } from "../../config";
import { State } from "../state";
import { CategoryActions } from "../actions";

type CategoriesDispatch = Thunk.ThunkDispatch<State, any, CategoryActions>; 

/**
 * API react-redux hook
 * @returns an API results from GET API for product categories
 */
export const useCategories = () => {
    const state = useSelector<State, Loadable<string[]>>((state) => state.categories, shallowEqual);
    const dispatch: CategoriesDispatch = useDispatch();
    React.useEffect(() => {
        dispatch(async (dispatch: Dispatch<CategoryActions>, getState) => {
            const categories = getState().categories;
            if (categories.isLoading || categories.response) {
                return;
            }
            dispatch({
                type: "loadCategories",
            });
            try {
                dispatch({
                    type: "setCategories",
                    payload: await createLoaded(await configuredApi.products.getCategories()),
                });
            } catch (e) {
                dispatch({
                    type: "errorCategories",
                    payload: createError(e),
                });
            }
        });
    }, [dispatch]);
    return state;
};
