import * as React from "react";
import { useCart } from "../store/hooks/useCart";
import { Load } from "./Loadable";

export interface CartProps {
    userId: number;
}

export const Cart: React.FunctionComponent<CartProps> = (props) => {
    const cart = useCart(props.userId);
    return (
        <Load loadable={cart}>
            {(data) => {
                return <div></div>;
            }}
        </Load>
    );
};
