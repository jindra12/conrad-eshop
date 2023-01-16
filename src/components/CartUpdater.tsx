import * as React from "react";
import { AddItem, CartItem, CartResult } from "../api";
import { userId } from "../config";
import { useUpdateCart } from "../store/hooks/useUpdateCart";
import { getCartItems } from "../utils/cartResult";
import { getSerializedTodayDate } from "../utils/date";

export interface CartUpdaterProps {
    /**
     * Products already in cart
     */
    cart?: CartResult[];
    /**
     * children as function, adds cart update functionality
     * @param cart Cart items to be displayed
     * @param updateFn function that changes the quantity of the products in cart
     * @param deleteFn function that deletes a product from a cart
     */
    children: (
        cart: CartItem[],
        updateFn: (productId: number, quantity: number) => void,
        deleteFn: (productId: number) => void,
    ) => React.ReactNode;
}

/**
 * Children as function component, adds cart update functionality for other components
 */
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
                const currentProducts = prevState.products.reduce((accumulator: Record<number, CartItem>, item) => {
                    accumulator[item.productId] = item;
                    return accumulator;
                }, {});
                currentProducts[productId] = {
                    productId: productId,
                    quantity: quantity,
                };
                return {
                    ...prevState,
                    products: Object.values(currentProducts),
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
