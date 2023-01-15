import * as React from "react";
import { List } from "antd";
import { useProducts } from "../store/hooks/useProducts";
import { useCart } from "../store/hooks/useCart";
import { userId } from "../config";
import { Load } from "./Loadable";
import { BaseLayout } from "./BaseLayout";
import { SmallProduct } from "./SmallProduct";

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
                                        <SmallProduct product={product} />
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
