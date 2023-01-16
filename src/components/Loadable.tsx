import * as React from "react";
import { Loadable } from "../utils/loadable";

export interface LoadableProps<T> {
    /**
     * Object which denotes the state of API request
     */
    loadable: Loadable<T>;
    /**
     * Function as children when data loads
     */
    children: (data: T) => React.ReactNode;
    /**
     * Configurable default component display
     */
    default?: React.ReactNode
}

/**
 * Manages display of loading/data results/api errors from back end
 */
export const Load = <T extends any>(props: LoadableProps<T>) => {
    const { loadable } = props;
    if (loadable.isLoading) {
        return <>Api is loading</>;
    }
    if (loadable.error) {
        return <>{JSON.stringify(loadable.error)}</>
    }
    if (loadable.response) {
        return <>{props.children(loadable.response)}</>
    }
    if (props.default) {
        return <>{props.default}</>
    }
    return <div></div>;
};