import { Button, Form, Input, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React from 'react'
import { Constants } from 'botbuilder-share'
const { ConditionOperator } = Constants;
const { Option } = Select

interface ConditionPayload {
    condition: string,
    operator: string,
    operant: number,
    true_run_node_id: string,
    false_run_node_id: string
}

interface ConditionFloatPannelLayoutProps {
    payload: ConditionPayload,
    onChange: (payload: ConditionPayload) => void,
    onDelete: () => void
}

export const ConditionFloatPannelLayout: React.FC<ConditionFloatPannelLayoutProps> = ({ payload, onChange, onDelete }) => {
    const onFinish = (payload: ConditionPayload) => {
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
                <Input placeholder={`請輸入 condition`} />
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
                <Input placeholder={`請輸入 operant`} />

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