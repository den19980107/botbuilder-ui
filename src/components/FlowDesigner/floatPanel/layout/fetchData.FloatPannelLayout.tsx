import { Button, Form, Input, Select } from 'antd';
import React from 'react'
import { Constants, FetchDataNodePayload } from 'botbuilder-share';
const { HttpMethods } = Constants
const { Option } = Select
const { TextArea } = Input;

interface FetchDataFloatPannelLayoutProps {
    payload: FetchDataNodePayload,
    onChange: (payload: FetchDataNodePayload) => void,
    onDelete: () => void
}

export const FetchDataFloatPannelLayout: React.FC<FetchDataFloatPannelLayoutProps> = ({ payload, onChange, onDelete }) => {
    const onFinish = (payload: FetchDataNodePayload) => {
        onChange(payload)
    };

    return (
        <Form
            name="fetchData"
            layout="vertical"
            onFinish={onFinish}
        >
            <Form.Item
                label="url"
                name="url"
                rules={[{ required: true, message: 'Please input url!' }]}
                initialValue={payload.url}
            >
                <Input placeholder={`請輸入 url`} />
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
                label="body 內容"
                name="body"
                initialValue={payload.body}
            >
                < TextArea />
            </Form.Item>

            <Form.Item
                label="header 內容"
                name="header"
                initialValue={payload.headers}
            >
                < TextArea />
            </Form.Item>

            <Form.Item
                label="定義一個變數來儲存 fetch 結果"
                name="storeDataAt"
                initialValue={payload.storeDataAt}
            >
                <Input></Input>
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