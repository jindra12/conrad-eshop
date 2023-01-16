import * as React from "react";
import { Descriptions } from "antd";
import { Product } from "../api";

export interface ProductDescriptionProps {
    /**
     * Product to be described
     */
    product: Product;
    /**
     * Screen resolution breakpoints. For more, see Description.Item docs on antd
     */
    size?: number;
    /**
     * Hide long product description
     */
    hideDescription?: boolean
}

/**
 * Configurable description of a single product
 */
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
