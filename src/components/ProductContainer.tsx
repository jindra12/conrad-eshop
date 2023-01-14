import * as React from "react";
import { useParams } from "react-router-dom";
import { Throw } from "throw-expression";
import { userId } from "../config";
import { useCart } from "../store/hooks/useCart";
import { CartUpdater } from "./CartUpdater";
import { Load } from "./Loadable";
import { Product } from "./Product";

export const ProductContainer: React.FunctionComponent = () => {
    const params = useParams();
    const productId = parseInt(
        params.productId ??
        Throw("Using Product component without id param in url is not allowed")
    );
    const cart = useCart(userId);
    return (
        <Load loadable={cart}>
            {(data) => (
                <CartUpdater cart={data}>
                    {(cart, onPurchase) => {
                        const quantity = cart.find((item) => item.productId === productId)?.quantity || 1;
                        return (
                            <Product
                                productId={productId}
                                quantity={quantity}
                                onPurchase={onPurchase}
                                hasCart={cart.length > 0}
                            />
                        );
                    }}
                </CartUpdater>
            )}
        </Load>
    );
};
