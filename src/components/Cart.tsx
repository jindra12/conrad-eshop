import * as React from "react";
import { List } from "antd";
import { useCart } from "../store/hooks/useCart";
import { Load } from "./Loadable";
import { BaseLayout } from "./BaseLayout";
import { CartUpdater } from "./CartUpdater";
import { CartItem } from "./CartItem";

export interface CartProps {
    /**
     * ID of the currently logged-in user
     */
    userId: number;
}

/**
 * Component for cart page with products to purchase
 */
export const Cart: React.FunctionComponent<CartProps> = (props) => {
    const cart = useCart(props.userId);
    return (
        <BaseLayout>
            <Load loadable={cart}>
                {(data) => (
                    <CartUpdater cart={data}>
                        {(cart, updateCart, deleteFromCart) => (
                            <List
                                itemLayout="horizontal"
                                dataSource={cart}
                                renderItem={(product) => (
                                    <CartItem
                                        {...product}
                                        onChange={updateCart}
                                        onRemove={deleteFromCart}
                                    />
                                )}
                            />
                        )}
                    </CartUpdater>
                )}
            </Load>
        </BaseLayout>
    );
};
