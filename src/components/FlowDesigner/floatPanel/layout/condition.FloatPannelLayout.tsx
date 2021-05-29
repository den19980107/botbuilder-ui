import { Button, Form, Input, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React from 'react'
import { Constants, ConditionNodePayload } from 'botbuilder-share'
import { AutoCompleteWithScriptResource } from '../../components/autoCompleteWithScriptResource';
const { ConditionOperator } = Constants;
const { Option } = Select


interface ConditionFloatPannelLayoutProps {
    payload: ConditionNodePayload,
    nodeId: string,
    onChange: (payload: ConditionNodePayload) => void,
    onDelete: () => void
}

export const ConditionFloatPannelLayout: React.FC<ConditionFloatPannelLayoutProps> = ({ payload, nodeId, onChange, onDelete }) => {
    const onFinish = (payload: ConditionNodePayload) => {
        onChange(payload)
    };

    return (
        <Form
            name="fetchData"
            layout="vertical"
            onFinish={onFinish}
        >
            <Form.Item
                label="condition"
                name="condition"
                rules={[{ required: true, message: 'Please input condition!' }]}
                initialValue={payload.condition}
            >
                <AutoCompleteWithScriptResource nodeId={nodeId} placeholder="請輸入 condition"></AutoCompleteWithScriptResource>
            </Form.Item>

            <Form.Item
                label="operator"
                name="operator"
                rules={[{ required: true, message: 'Please input operator!' }]}
                initialValue={payload.operator}
            >
                <Select  >
                    {Object.keys(ConditionOperator).map((operator, key) => <Option value={operator} key={key}>{operator}</Option>)}
                </Select>

            </Form.Item>

            <Form.Item
                label="operant"
                name="operant"
                rules={[{ required: true, message: 'Please input operant!' }]}
                initialValue={payload.operant}
            >
                <AutoCompleteWithScriptResource nodeId={nodeId} placeholder="請輸入 operant"></AutoCompleteWithScriptResource>
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