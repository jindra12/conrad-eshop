import * as React from "react";
import { useMediaQuery } from "react-responsive";
import {
    Form,
    Button,
    Card,
    Rate,
    Slider,
    InputNumber,
    Descriptions,
    message,
} from "antd";
import { useProductById } from "../store/hooks/useProductById";
import { Load } from "./Loadable";
import { BaseLayout } from "./BaseLayout";
import { ProductDescription } from "./ProductDescription";

export interface ProductProps {
    productId: number;
    quantity: number;
    onPurchase: (productId: number, quantity: number) => void;
    hasCart: boolean;
}

export const Product: React.FunctionComponent<ProductProps> = (props) => {
    const product = useProductById(props.productId);
    const [inputValue, setInputValue] = React.useState<number | null>(
        props.quantity
    );
    const isMobile = useMediaQuery({ query: "(max-width: 1200px)" });
    const responsiveBreaks = React.useMemo(
        () =>
            isMobile
                ? {
                    xxl: 1,
                    xl: 1,
                    lg: 1,
                    md: 1,
                    sm: 1,
                    xs: 1,
                }
                : {
                    xxl: 2,
                    xl: 2,
                    lg: 2,
                    md: 2,
                    sm: 2,
                    xs: 2,
                },
        [isMobile]
    );
    const [messageApi, contextHolder] = message.useMessage();
    return (
        <BaseLayout cart={props.hasCart} messageContext={contextHolder}>
            <Load loadable={product}>
                {(data) => {
                    return (
                        <Form
                            name="basic"
                            labelCol={{
                                span: 8,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={() => {
                                props.onPurchase(data.id, inputValue || 1);
                                messageApi.open({
                                    type: 'success',
                                    content: `Product ${data.title} added to cart, ${inputValue || 1} pieces!`,
                                })
                            }}
                            autoComplete="off"
                        >
                            <Descriptions column={responsiveBreaks}>
                                <Descriptions.Item>
                                    <Card
                                        hoverable
                                        style={{
                                            maxWidth: 650,
                                            width: "100%",
                                            minWidth: 400,
                                        }}
                                        cover={
                                            <img
                                                alt="Descriptive image of product"
                                                src={data.image}
                                            />
                                        }
                                    >
                                        <Card.Meta
                                            title={data.title}
                                            description={
                                                <ProductDescription product={data} size={1} />
                                            }
                                        />
                                    </Card>
                                </Descriptions.Item>
                                <Descriptions.Item style={{ minWidth: 400 }}>
                                    <Descriptions
                                        column={{
                                            xxl: 1,
                                            xl: 1,
                                            lg: 1,
                                            md: 1,
                                            sm: 1,
                                            xs: 1,
                                        }}
                                    >
                                        <Descriptions.Item
                                            label="Select amount"
                                            labelStyle={{
                                                alignSelf: "center",
                                            }}
                                        >
                                            <InputNumber
                                                min={1}
                                                max={20}
                                                style={{
                                                    margin: "0 16px",
                                                }}
                                                value={inputValue}
                                                onChange={setInputValue}
                                                required
                                            />
                                        </Descriptions.Item>
                                        <Descriptions.Item>
                                            <Slider
                                                min={1}
                                                max={20}
                                                onChange={setInputValue}
                                                value={inputValue || 0}
                                                style={{ width: 200 }}
                                            />
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Total pay for product">
                                            {data.price * (inputValue || 0)}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Number of users who rated this product">
                                            {data.rate.count}
                                        </Descriptions.Item>
                                        <Descriptions.Item
                                            label="User rating"
                                            style={{ alignContent: "center" }}
                                        >
                                            <Rate disabled defaultValue={data.rate.rate} />
                                        </Descriptions.Item>
                                        <Descriptions.Item>
                                            <Button type="primary" htmlType="submit">
                                                Add to cart
                                            </Button>
                                        </Descriptions.Item>
                                    </Descriptions>
                                </Descriptions.Item>
                            </Descriptions>
                        </Form>
                    );
                }}
            </Load>
        </BaseLayout>
    );
};
