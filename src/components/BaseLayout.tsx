import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";

export interface BaseLayoutProps {
    /**
     * Should a cart link be displayed in the page header?
     */
    cart?: boolean;
    /**
     * Message context prop for API responses
     */
    messageContext?: React.ReactElement;
}

/**
 * Base layout of every page. This component should be at the top of the virtual DOM.
 */
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
