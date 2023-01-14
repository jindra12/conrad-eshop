import * as React from "react";
import { userId } from "../config";
import { useCart } from "../store/hooks/useCart";
import { Load } from "./Loadable";

export interface QuantityProps {
    productId: number;
    children: (quantity: number) => React.ReactNode;
}

export const Quantity: React.FunctionComponent<QuantityProps> = (props) => {
    const cart = useCart(userId);
    return (
        <Load loadable={cart}>
            {(data) => {
                const quantity = data.find((item) => item.productId === props.productId)?.quantity || 0;
                return <>{props.children(quantity)}</>
            }}
        </Load>
    )
};