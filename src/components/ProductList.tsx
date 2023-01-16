import * as React from "react";
import { useMediaQuery } from "react-responsive";
import { List, Button, message } from "antd";
import { useProducts } from "../store/hooks/useProducts";
import { useCart } from "../store/hooks/useCart";
import { userId } from "../config";
import { Load } from "./Loadable";
import { BaseLayout } from "./BaseLayout";
import { SmallProduct } from "./SmallProduct";
import { CartUpdater } from "./CartUpdater";

/**
 * Main page list of products
 */
export const ProductList: React.FunctionComponent = () => {
    const products = useProducts();
    const cart = useCart(userId);
    const isSmallScreen = useMediaQuery({ query: "(max-width: 600px)" });
    const [messageApi, contextHolder] = message.useMessage();
    return (
        <Load loadable={cart}>
            {(data) => (
                <CartUpdater>
                    {(cart, updateFn) => (
                        <BaseLayout cart={data.length > 0} messageContext={contextHolder}>
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
                                                    id={`buy_${product.id}`}
                                                    onClick={() => {
                                                        const currentQuantity = cart.find(
                                                            (item) => item.productId === product.id
                                                        )?.quantity;
                                                        const nextQuantity = (currentQuantity || 0) + 1;
                                                        updateFn(product.id, nextQuantity);
                                                        messageApi.open({
                                                            type: "success",
                                                            content: `Product ${product.title} added to cart, ${nextQuantity} pieces!`,
                                                            duration: 2,
                                                        });
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
