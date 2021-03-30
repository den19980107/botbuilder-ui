import React from 'react'
import HttpMethod from '../../../../constant/httpMethod.constants'
import { Form, Input, Button, Select, message } from 'antd';
const { Option } = Select;

interface WebhookPayload {
    route: string,
    method: HttpMethod,
    storeBodyAt: string
}

interface WebhookFloatPannelLayoutProps {
    payload: WebhookPayload,
    onChange: (payload: WebhookPayload) => void,
    onDelete: () => void
}

export const WebhookFloatPannelLayout: React.FC<WebhookFloatPannelLayoutProps> = ({ payload, onChange, onDelete }) => {
    const onFinish = (payload: WebhookPayload) => {
        onChange(payload)
    };

    return (
        <Form
            name="webhook"
            layout="vertical"
            onFinish={onFinish}
        >
            <Form.Item
                label="webhook url"
                name="route"
                rules={[{ required: true, message: 'Please input webhook url!' }]}
                initialValue={payload.route}
            >
                <Input placeholder={`請輸入 webhook url 並以 "/" 作為開頭`} />
            </Form.Item>

            <Form.Item
                label="http method"
                name="method"
                rules={[{ required: true, message: 'Please input http method!' }]}
                initialValue={payload.method}
            >
                <Select  >
                    {Object.keys(HttpMethod).map((method, key) => <Option value={method} key={key}>{method}</Option>)}
                </Select>
            </Form.Item>

            <Form.Item
                label="定義一個變數來存放 body 內容"
                name="storeBodyAt"
                initialValue={payload.storeBodyAt}
            >
                <Input />
            </Form.Item>

            <Form.Item >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Button danger onClick={onDelete}>刪除</Button>
                    <Button type="primary" htmlType="submit">
                        確定
                    </Button>
                </div>
            </Form.Item>
        </Form>
    );
}