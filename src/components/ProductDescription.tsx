import * as React from "react";
import { Descriptions } from "antd";
import { Product } from "../api";

export interface ProductDescriptionProps {
    product: Product;
}

export const ProductDescription: React.FunctionComponent<ProductDescriptionProps> = (props) => {
    return (
        <Descriptions>
            <Descriptions.Item label="Product description">{props.product.description}</Descriptions.Item>
            <Descriptions.Item label="Product category">{props.product.category}</Descriptions.Item>
            <Descriptions.Item label="Product price">{props.product.price}</Descriptions.Item>
        </Descriptions>
    );
};