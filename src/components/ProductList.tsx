import * as React from "react";
import { Link } from "react-router-dom";
import { List, Avatar } from "antd";
import { useProducts } from "../store/hooks/useProducts";
import { ProductDescription } from "./ProductDescription";
import { useCart } from "../store/hooks/useCart";
import { userId } from "../config";
import { Load } from "./Loadable";
import { BaseLayout } from "./BaseLayout";

export const ProductList: React.FunctionComponent = () => {
    const products = useProducts();
    const cart = useCart(userId);
    return (
        <Load loadable={cart}>
            {(data) => (
                <BaseLayout cart={data.length > 0}>
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
            )}
        </Load>

    );
};
