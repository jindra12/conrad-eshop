import * as React from "react";
import { useMediaQuery } from "react-responsive";
import { List, InputNumber, Button } from "antd";
import { useProductById } from "../store/hooks/useProductById";
import { Load } from "./Loadable";
import { SmallProduct } from "./SmallProduct";

export interface CartItemProps {
    /**
     * ID of a single product in a cart
     */
    productId: number;
    /**
     * Quantity of a single product in a cart
     */
    quantity: number;
    /**
     * On change quantity callback
     * @param productId Id of the product, whose quantity we are changing
     * @param quantity quantity to change it to
     */
    onChange: (productId: number, quantity: number) => void;
    /**
     * On remove product callback
     * @param productId Id of the product we wish to remove from cart
     */
    onRemove: (productId: number) => void;
}

/**
 * A single item in a cart. Contains product information and controls for quantity of the product, and a button for removal.
 */
export const CartItem: React.FunctionComponent<CartItemProps> = (props) => {
    const product = useProductById(props.productId);
    const isSmallScreen = useMediaQuery({ query: "(max-width: 600px)" });
    return (
        <div className="Store__cart-item">
            <Load loadable={product}>
                {(data) => (
                    <List.Item>
                        <SmallProduct product={data} hide={isSmallScreen ? "all" : "description"} />
                        <InputNumber
                            defaultValue={props.quantity}
                            onChange={(value) => {
                                if (value) {
                                    props.onChange(props.productId, value);
                                }
                            }}
                            required
                            min={1}
                            max={20}
                            id={`count_${data.id}`}
                        />
                        <Button
                            type="dashed"
                            htmlType="button"
                            id={`remove_${data.id}`}
                            onClick={() => props.onRemove(props.productId)}
                        >
                            Remove
                        </Button>
                    </List.Item>
                )}
            </Load>
        </div>
    );
};
