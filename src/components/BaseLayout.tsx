import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";

export interface BaseLayoutProps {
    cart?: boolean;
}

export const BaseLayout: React.FunctionComponent<
    React.PropsWithChildren<BaseLayoutProps>
> = (props) => {
    const navigate = useNavigate();
    return (
        <Layout>
            <Layout.Header>
                <Menu
                    direction="rtl"
                    theme="dark"
                    mode="horizontal"
                    items={
                        props.cart
                            ? [
                                {
                                    title: "Products",
                                    key: "Products",
                                    onClick: () => navigate("/products"),
                                },
                                {
                                    title: "Cart",
                                    key: "Cart",
                                    onClick: () => navigate("/cart"),
                                },
                            ]
                            : [
                                {
                                    title: "Products",
                                    key: "Products",
                                    onClick: () => navigate("/products"),
                                },
                            ]
                    }
                />
            </Layout.Header>
            <Layout.Content>{props.children}</Layout.Content>
        </Layout>
    );
};
