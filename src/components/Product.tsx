import * as React from "react";
import {
    Form,
    Button,
    Card,
    Rate,
    Slider,
    Row,
    Col,
    InputNumber,
    Descriptions,
} from "antd";
import { useProductById } from "../store/hooks/useProductById";
import { useUpdateCart } from "../store/hooks/useUpdateCart";
import { AddItem, CartItem } from "../api";
import { userId } from "../config";
import { getSerializedTodayDate } from "../utils/date";
import { Load } from "./Loadable";
import { BaseLayout } from "./BaseLayout";
import { ProductDescription } from "./ProductDescription";

export interface ProductProps {
    productId: number;
    quantity?: number;
}

export const Product: React.FunctionComponent<ProductProps> = (props) => {
    const product = useProductById(props.productId);
    const [inputValue, setInputValue] = React.useState<number | null>(props.quantity || 1);
    const [toPurchase, setToPurchase] = React.useState<CartItem>();
    const cartItem = React.useMemo<AddItem>(() => {
        return {
            date: getSerializedTodayDate(),
            products: toPurchase ? [toPurchase] : [],
            userId: userId,
        };
    }, [toPurchase]);
    const cartId = useUpdateCart(cartItem);
    return (
        <BaseLayout cart={Boolean(cartId.response)}>
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
                                setToPurchase({
                                    productId: data.id,
                                    quantity: inputValue || 1,
                                });
                            }}
                            autoComplete="off"
                        >
                            <Card
                                hoverable
                                style={{
                                    width: 240,
                                }}
                                cover={
                                    <img alt="Descriptive image of product" src={data.image} />
                                }
                            >
                                <Card.Meta
                                    title={data.title}
                                    description={<ProductDescription product={data} />}
                                />
                            </Card>
                            <Row>
                                <Col span={16}>
                                    <Descriptions title="Cart">
                                        <Descriptions.Item label="Use slider to add to cart: ">
                                            {data.title}
                                        </Descriptions.Item>
                                    </Descriptions>
                                </Col>
                                <Col span={12}>
                                    <Slider
                                        min={1}
                                        max={20}
                                        onChange={setInputValue}
                                        value={inputValue || 0}
                                    />
                                </Col>
                                <Col span={4}>
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
                                </Col>
                            </Row>
                            <Descriptions title="Price">
                                <Descriptions.Item label="Total pay for product">
                                    {data.price * (inputValue || 0)}
                                </Descriptions.Item>
                                <Descriptions.Item label="Number of users who rated this product">
                                    {data.rate.count}
                                </Descriptions.Item>
                                <Descriptions.Item label="User rating">
                                    <Rate disabled defaultValue={data.rate.rate} />
                                </Descriptions.Item>
                            </Descriptions>
                            <Form.Item
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            >
                                <Button type="primary" htmlType="submit">
                                    Add to cart
                                </Button>
                            </Form.Item>
                        </Form>
                    );
                }}
            </Load>
        </BaseLayout>
    );
};
