import { Button, Form, Input } from 'antd';
import { DeclarVariableNodePayload } from 'botbuilder-share';
import React from 'react'

interface DeclareVariableFloatPannelLayoutProps {
    payload: DeclarVariableNodePayload,
    onChange: (payload: DeclarVariableNodePayload) => void,
    onDelete: () => void
}

export const DeclareVariableFloatPannelLayout: React.FC<DeclareVariableFloatPannelLayoutProps> = ({ payload, onChange, onDelete }) => {
    const onFinish = (payload: DeclarVariableNodePayload) => {
        onChange(payload)
    };

    return (
        <Form
            name="fetchData"
            layout="vertical"
            onFinish={onFinish}
        >
            <Form.Item
                label="變數 key"
                name="key"
                rules={[{ required: true, message: 'Please input variable key!' }]}
                initialValue={payload.key}
            >
                <Input placeholder={`請輸入變數 key`} />
            </Form.Item>

            <Form.Item
                label="變數 value"
                name="value"
                rules={[{ required: true, message: 'Please input variable value!' }]}
                initialValue={payload.value}
            >
                <Input placeholder={`請輸入變數 value`} />
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