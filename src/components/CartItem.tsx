import * as React from "react";
import { Link } from "react-router-dom";
import { List, Avatar, InputNumber } from "antd";
import { useProductById } from "../store/hooks/useProductById";
import { Load } from "./Loadable";
import { ProductDescription } from "./ProductDescription";

export interface CartItemProps {
    productId: number;
    quantity: number;
    onChange: (quantity: number, productId: number) => void;
}

export const CartItem: React.FunctionComponent<CartItemProps> = (props) => {
    const product = useProductById(props.productId);
    return (
        <Load loadable={product}>
            {(data) => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar src={data.image} />}
                        title={
                            <Link id={`id_${data.id.toString()}`} to={`/products/${data.id}`}>
                                {data.title}
                            </Link>
                        }
                        description={<ProductDescription product={data} />}
                    />
                    <InputNumber
                        defaultValue={props.quantity}
                        onChange={(value) => {
                            if (value) {
                                props.onChange(value, props.productId);
                            }
                        }}
                        required
                    />
                </List.Item>
            )}
        </Load>
    );
};
