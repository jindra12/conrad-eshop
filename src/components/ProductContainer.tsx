import * as React from "react";
import { useParams } from "react-router-dom";
import { Throw } from "throw-expression";
import { usePeekCart } from "../store/hooks/usePeekCart";
import { Product } from "./Product";
import { Quantity } from "./Quantity";

export const ProductContainer: React.FunctionComponent = () => {
    const params = useParams();
    const productId = parseInt(
        params.productId ??
        Throw("Using Product component without id param in url is not allowed")
    );
    const cart = usePeekCart();
    if (!cart.response) {
        return <Product productId={productId} />
    }
    return (
        <Quantity productId={productId}>
            {(quantity) => (
                <Product productId={productId} quantity={quantity} />
            )}
        </Quantity>
    );
}