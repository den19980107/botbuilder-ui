import React from 'react'
import { Constants } from 'botbuilder-share';
import { Form, Input, Button, Select, message, Badge } from 'antd';
import auth from '../../../../utils/auth';
import { WebHookNodePayload } from 'botbuilder-share'
const { HttpMethods } = Constants
const { Option } = Select;

interface WebhookFloatPannelLayoutProps {
    payload: WebHookNodePayload,
    onChange: (payload: WebHookNodePayload) => void,
    onDelete: () => void
}

export const WebhookFloatPannelLayout: React.FC<WebhookFloatPannelLayoutProps> = ({ payload, onChange, onDelete }) => {
    const onFinish = (payload: WebHookNodePayload) => {
        onChange(payload)
    };

    return (
        <Form
            name="webhook"
            layout="vertical"
            onFinish={onFinish}
        >
            <Form.Item
                style={{ display: "none" }}
                name="userId"
                initialValue={auth.getCurrentUser().name}
            >
                <Input disabled></Input>
            </Form.Item>
            <Form.Item
                label="webhook url"
                name="route"
                rules={[{ required: true, message: 'Please input webhook url!' }]}
                initialValue={payload.route}
            >
                <Input addonBefore={`/${auth.getCurrentUser().name}/`} placeholder={`請輸入 webhook url 並以 "/" 作為開頭`} />
            </Form.Item>

            <Form.Item
                label="http method"
                name="method"
                rules={[{ required: true, message: 'Please input http method!' }]}
                initialValue={payload.method}
            >
                <Select  >
                    {Object.keys(HttpMethods).map((method, key) => <Option value={method} key={key}>{method}</Option>)}
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


interface WebhookPreviewLayoutProps {
    payload: WebHookNodePayload
}

export const WebhookPreviewLayout: React.FC<WebhookPreviewLayoutProps> = ({ payload }) => {
    return (
        <div>
            {payload.method && payload.route &&
                <div style={{ alignItems: "center", marginBottom: "0.5rem", display: "flex" }}>
                    <Badge style={{ marginRight: "0.5rem", background: "#ffd95b" }} count={payload.method}></Badge>
                    <span>{`/ ${auth.getCurrentUser().name} / ${payload.route}`}</span>
                </div>
            }

        </div>
    );
}