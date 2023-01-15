import * as React from "react";
import { AddItem, CartItem, CartResult } from "../api";
import { userId } from "../config";
import { useUpdateCart } from "../store/hooks/useUpdateCart";
import { getCartItems } from "../utils/cartResult";
import { getSerializedTodayDate } from "../utils/date";

export interface CartUpdaterProps {
    cart?: CartResult[];
    children: (
        cart: CartItem[],
        updateFn: (productId: number, quantity: number) => void,
        deleteFn: (productId: number) => void,
    ) => React.ReactNode;
}

export const CartUpdater: React.FunctionComponent<CartUpdaterProps> = (
    props
) => {
    const [products, setProducts] = React.useState<AddItem>(() => {
        return {
            date: getSerializedTodayDate(),
            products: props.cart ? getCartItems(props.cart) : [],
            userId: userId,
        };
    });
    const _ = useUpdateCart(products);
    const updateCart = React.useCallback(
        (productId: number, quantity: number) => {
            setProducts((prevState) => {
                const hasProduct = prevState.products.some(
                    (product) => product.productId === productId
                );
                if (!hasProduct) {
                    return {
                        ...prevState,
                        products: prevState.products.concat([
                            { productId: productId, quantity: quantity },
                        ]),
                    };
                }
                const modified = prevState.products.reduce(
                    (modified: CartItem[], item) => {
                        if (item.productId === productId) {
                            if (quantity !== 0) {
                                modified.push({
                                    ...item,
                                    quantity: quantity,
                                });
                            }
                        } else {
                            modified.push(item);
                        }
                        return modified;
                    },
                    []
                );
                return {
                    ...prevState,
                    products: modified,
                };
            });
        },
        []
    );
    const deleteFromCart = React.useCallback((productId: number) => {
        setProducts(prevState => ({
            ...prevState,
            products: prevState.products.filter((p) => p.productId !== productId),
        }));
    }, []);
    return <>{props.children(products.products, updateCart, deleteFromCart)}</>;
};
