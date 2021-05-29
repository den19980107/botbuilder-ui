import { Button, Form, Input } from 'antd';
import { DeclarVariableNodePayload } from 'botbuilder-share';
import { v4 as uuid } from 'uuid'
import React from 'react'
import { AutoCompleteWithScriptResource } from '../../components/autoCompleteWithScriptResource';
import { DefindVariableInput } from '../../components/defindVariableInput';

interface DeclareVariableFloatPannelLayoutProps {
    payload: DeclarVariableNodePayload,
    nodeId: string,
    onChange: (payload: DeclarVariableNodePayload) => void,
    onDelete: () => void
}


export const DeclareVariableFloatPannelLayout: React.FC<DeclareVariableFloatPannelLayoutProps> = ({ payload, nodeId, onChange, onDelete }) => {
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
                <DefindVariableInput nodeId={nodeId} type="flowVariable"></DefindVariableInput>
            </Form.Item>

            <Form.Item
                label="變數 value"
                name="value"
                rules={[{ required: true, message: 'Please input variable value!' }]}
                initialValue={payload.value}
            >
                <AutoCompleteWithScriptResource nodeId={nodeId} placeholder="請輸入變數 key"></AutoCompleteWithScriptResource>
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