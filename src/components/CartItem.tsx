import * as React from "react";
import { useMediaQuery } from "react-responsive";
import { List, InputNumber, Button } from "antd";
import { useProductById } from "../store/hooks/useProductById";
import { Load } from "./Loadable";
import { SmallProduct } from "./SmallProduct";

export interface CartItemProps {
    productId: number;
    quantity: number;
    onChange: (productId: number, quantity: number) => void;
    onRemove: (productId: number) => void;
}

export const CartItem: React.FunctionComponent<CartItemProps> = (props) => {
    const product = useProductById(props.productId);
    const isSmallScreen = useMediaQuery({ query: "(max-width: 600px)" });
    return (
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
                        style={{
                            marginTop: 10,
                        }}
                    />
                    <Button
                        type="dashed"
                        htmlType="button"
                        onClick={() => props.onRemove(props.productId)}
                        style={{ marginLeft: 10, marginTop: 10 }}
                    >
                        Remove
                    </Button>
                </List.Item>
            )}
        </Load>
    );
};
