import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";

export interface BaseLayoutProps {
    cart?: boolean;
    messageContext?: React.ReactElement;
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
                                    label: "Products",
                                    key: "Products",
                                    onClick: () => navigate("/"),
                                },
                                {
                                    label: "Cart",
                                    key: "Cart",
                                    onClick: () => navigate("/cart"),
                                },
                            ]
                            : [
                                {
                                    label: "Products",
                                    key: "Products",
                                    onClick: () => navigate("/"),
                                },
                            ]
                    }
                />
                {props.messageContext}
            </Layout.Header>
            <Layout.Content>{props.children}</Layout.Content>
        </Layout>
    );
};
