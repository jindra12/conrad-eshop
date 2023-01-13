import * as React from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../store/hooks/useProducts";
import { Load } from "./Loadable";

export const ProductList: React.FunctionComponent = () => {
    const products = useProducts();
    return (
        <Load loadable={products}>
            {(data) => (
                <ul>
                    {data.map((product) => (
                        <li key={product.id}>
                            <Link id={`id_${product.id.toString()}`} to={`/products/${product.id}`}>{product.title}</Link>
                        </li>
                    ))}
                </ul>
            )}
        </Load>
    );
};
