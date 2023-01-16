import * as React from "react";
import { useMediaQuery } from "react-responsive";
import { Link, useNavigate } from "react-router-dom";
import { List, Avatar } from "antd";
import { Product } from "../api";
import { ProductDescription } from "./ProductDescription";

export interface SmallProductProps {
    /**
     * Product to be displayed
     */
    product: Product;
    /**
     * Configures amount of information displayed about a product
     */
    hide?: "description" | "all";
}

/**
 * Small product display, used in lists
 */
export const SmallProduct: React.FunctionComponent<SmallProductProps> = (
    props
) => {
    const { product } = props;
    const isMobile = useMediaQuery({ query: "(max-width: 1200px)" });
    const responsiveBreaks = React.useMemo(
        () => (isMobile ? 1 : undefined),
        [isMobile]
    );
    const navigation = useNavigate();
    return (
        <List.Item.Meta
            avatar={
                <Avatar
                    src={product.image}
                    onClick={() => navigation(`/products/${product.id}`)}
                    className="Store__small-avatar"
                />
            }
            title={
                <Link id={`link_${product.id.toString()}`} to={`/products/${product.id}`}>
                    {product.title}
                </Link>
            }
            description={
                props.hide === "all" ? null : (
                    <ProductDescription
                        product={product}
                        size={responsiveBreaks}
                        hideDescription={props.hide === "description"}
                    />
                )
            }
        />
    );
};
