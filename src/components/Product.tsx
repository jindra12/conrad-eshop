import * as React from "react";
import { useParams } from "react-router-dom";
import { Throw } from "throw-expression";
import { useProductById } from "../store/hooks/useProductById";

export const Product: React.FunctionComponent = () => {
    const params = useParams();
    const product = useProductById(parseInt(params.id ?? Throw("Using Product component without id param in url is not allowed")));
    return product.isLoading ? (
        <div>
            Product is loading...
        </div>
    ) : product.response ? (
        <div>
            {product.response.title}
        </div>
    ) : product.error ? (
        <div>
            {JSON.stringify(product.error)}
        </div>
    ) : (
        <></>
    );
};