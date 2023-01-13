import * as React from "react";
import { Loadable } from "../utils/loadable";

export interface LoadableProps<T> {
    loadable: Loadable<T>;
    children: (data: T) => React.ReactNode;
}

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
    return <div></div>;
};