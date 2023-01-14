import * as React from "react";
import { Link } from "react-router-dom";
import { List, Avatar } from "antd";
import { useProducts } from "../store/hooks/useProducts";
import { Load } from "./Loadable";
import { usePeekCart } from "../store/hooks/usePeekCart";
import { BaseLayout } from "./BaseLayout";
import { ProductDescription } from "./ProductDescription";

export const ProductList: React.FunctionComponent = () => {
    const products = useProducts();
    const peek = usePeekCart();
    return (
        <BaseLayout cart={Boolean(peek.response)}>
            <Load loadable={products}>
                {(data) => (
                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={(product) => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src={product.image} />}
                                    title={
                                        <Link
                                            id={`id_${product.id.toString()}`}
                                            to={`/products/${product.id}`}
                                        >
                                            {product.title}
                                        </Link>
                                    }
                                    description={<ProductDescription product={product} />}
                                />
                            </List.Item>
                        )}
                    />
                )}
            </Load>
        </BaseLayout>
    );
};
