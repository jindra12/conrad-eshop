import * as React from "react";
import { Api, Product } from "../api";
import { createError, createLoaded, Loadable } from "../utils/loadable";

export const ProductList: React.FunctionComponent = () => {
    const api = React.useMemo(() => new Api({
        baseUrl: "http://localhost:3000",
    }), []);
    const [products, setProducts] = React.useState<Loadable<Product[]>>({});
    React.useEffect(() => {
        (async () => {
            setProducts({ isLoading: true });
            try {
                setProducts(await createLoaded(await api.products.getProducts({
                    limit: 2,
                })))
            } catch (e) {
                setProducts(createError(e));
            }
        })();
    }, [api]);
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