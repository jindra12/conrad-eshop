import * as React from "react";
import { Descriptions } from "antd";
import { Product } from "../api";

export interface ProductDescriptionProps {
    product: Product;
    size?: number;
    hideDescription?: boolean
}

export const ProductDescription: React.FunctionComponent<
    ProductDescriptionProps
> = (props) => {
    return (
        <Descriptions
            column={
                props.size
                    ? {
                        xxl: props.size,
                        xl: props.size,
                        lg: props.size,
                        md: props.size,
                        sm: props.size,
                        xs: props.size,
                    }
                    : undefined
            }
        >
            {!props.hideDescription && (
                <Descriptions.Item label="Product description">
                    {props.product.description}
                </Descriptions.Item>
            )}
            <Descriptions.Item label="Product category">
                {props.product.category}
            </Descriptions.Item>
            <Descriptions.Item label="Product price">
                {props.product.price}
            </Descriptions.Item>
        </Descriptions>
    );
};
