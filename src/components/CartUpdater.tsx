import * as React from "react";
import { AddItem, CartItem } from "../api";
import { userId } from "../config";
import { useUpdateCart } from "../store/hooks/useUpdateCart";
import { getSerializedTodayDate } from "../utils/date";

export interface CartUpdaterProps {
    cart: CartItem[];
    children: (cart: CartItem[], updateFn: (productId: number, quantity: number) => void) => React.ReactNode;
}

export const CartUpdater: React.FunctionComponent<CartUpdaterProps> = (props) => {
    const [products, setProducts] = React.useState<AddItem>(() => {
        return {
            date: getSerializedTodayDate(),
            products: props.cart,
            userId: userId,
        };
    });
    const _ = useUpdateCart(products);
    const updateCart = React.useCallback((productId: number, quantity: number) => {
        setProducts((prevState) => {
            const modified = prevState.products.reduce((modified: CartItem[], item) => {
                if (item.productId === productId) {
                    if (quantity !== 0) {
                        modified.push({
                            ...item,
                            quantity: quantity,
                        })
                    }
                } else {
                    modified.push(item);
                }
                return modified;
            }, []);
            return {
                ...prevState,
                products: modified,
            };
        });
    }, []);
    return (
        <>{props.children(products.products, updateCart)}</>
    );
};
