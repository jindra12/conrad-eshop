import * as React from "react";
import { useMediaQuery } from "react-responsive";
import { List, Button } from "antd";
import { useProducts } from "../store/hooks/useProducts";
import { useCart } from "../store/hooks/useCart";
import { userId } from "../config";
import { Load } from "./Loadable";
import { BaseLayout } from "./BaseLayout";
import { SmallProduct } from "./SmallProduct";
import { CartUpdater } from "./CartUpdater";

export const ProductList: React.FunctionComponent = () => {
    const products = useProducts();
    const cart = useCart(userId);
    const isSmallScreen = useMediaQuery({ query: "(max-width: 600px)" });
    return (
        <Load loadable={cart}>
            {(data) => (
                <CartUpdater>
                    {(cart, updateFn) => (
                        <BaseLayout cart={data.length > 0}>
                            <Load loadable={products}>
                                {(data) => (
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={data}
                                        renderItem={(product) => (
                                            <List.Item>
                                                <SmallProduct
                                                    product={product}
                                                    hide={isSmallScreen ? "all" : undefined}
                                                />
                                                <Button
                                                    type="primary"
                                                    htmlType="button"
                                                    onClick={() => {
                                                        const currentQuantity = cart.find(
                                                            (item) => item.productId === product.id
                                                        )?.quantity;
                                                        updateFn(product.id, (currentQuantity || 0) + 1);
                                                    }}
                                                >
                                                    Add to cart
                                                </Button>
                                            </List.Item>
                                        )}
                                    />
                                )}
                            </Load>
                        </BaseLayout>
                    )}
                </CartUpdater>
            )}
        </Load>
    );
};
