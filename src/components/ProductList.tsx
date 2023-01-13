import * as React from "react";
import { useProducts } from "../store/hooks/useProducts";

export const ProductList: React.FunctionComponent = () => {
    const products = useProducts();
    return products.response ? (
        <ul>
            {products.response.map((product) => (
                <li key={product.id}>{product.title}</li>
            ))}
        </ul>
    ) : products.isLoading ? (
        <>
            Api loading...
        </>
    ) : (
        <>
            {JSON.stringify(products.error)}
        </>
    );
};