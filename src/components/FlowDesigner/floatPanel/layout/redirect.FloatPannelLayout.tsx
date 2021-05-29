import { Button, Form, Input } from 'antd';
import { RedirectNodePayload } from 'botbuilder-share';
import React from 'react'
import { AutoCompleteWithScriptResource } from '../../components/autoCompleteWithScriptResource';

interface RedirectFloatPannelLayoutProps {
    payload: RedirectNodePayload,
    nodeId: string,
    onChange: (payload: RedirectNodePayload) => void,
    onDelete: () => void
}

export const RedirectFloatPannelLayout: React.FC<RedirectFloatPannelLayoutProps> = ({ payload, nodeId, onChange, onDelete }) => {
    const onFinish = (payload: RedirectNodePayload) => {
        onChange(payload)
    };

    return (
        <Form
            name="redirect"
            layout="vertical"
            onFinish={onFinish}
        >
            <Form.Item
                label="重新導向 url"
                name="url"
                rules={[{ required: true, message: 'Please input redirect url!' }]}
                initialValue={payload.url}
            >
                <AutoCompleteWithScriptResource nodeId={nodeId} placeholder="請輸入重新導向 url"></AutoCompleteWithScriptResource>
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