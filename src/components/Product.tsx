import * as React from "react";
import { useParams } from "react-router-dom";
import { Throw } from "throw-expression";
import { useProductById } from "../store/hooks/useProductById";
import { Load } from "./Loadable";

export const Product: React.FunctionComponent = () => {
    const params = useParams();
    const product = useProductById(
        parseInt(
            params.productId ??
            Throw("Using Product component without id param in url is not allowed")
        )
    );
    return (
        <Load loadable={product}>
            {(data) => {
                return <h1>{data.title}</h1>;
            }}
        </Load>
    );
};
