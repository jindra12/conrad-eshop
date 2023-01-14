import * as React from "react";
import { List } from "antd";
import { useCart } from "../store/hooks/useCart";
import { Load } from "./Loadable";
import { BaseLayout } from "./BaseLayout";
import { CartUpdater } from "./CartUpdater";
import { CartItem } from "./CartItem";

export interface CartProps {
    userId: number;
}

export const Cart: React.FunctionComponent<CartProps> = (props) => {
    const cart = useCart(props.userId);
    return (
        <BaseLayout>
            <Load loadable={cart}>
                {(data) => (
                    <CartUpdater cart={data}>
                        {(cart, updateCart) => (
                            <List
                                itemLayout="horizontal"
                                dataSource={cart}
                                renderItem={(product) => (
                                    <CartItem {...product} onChange={updateCart} />
                                )}
                            />
                        )}
                    </CartUpdater>
                )}
            </Load>
        </BaseLayout>
    );
};
