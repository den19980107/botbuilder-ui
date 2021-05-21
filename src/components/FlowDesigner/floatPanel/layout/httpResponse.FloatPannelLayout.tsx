import { Button, Form, Input, Select } from 'antd';
import React from 'react'
import { HttpResponseNodePayload } from 'botbuilder-share'
const { Option } = Select


interface HttpResponseFloatPannelLayoutProps {
    payload: HttpResponseNodePayload,
    onChange: (payload: HttpResponseNodePayload) => void,
    onDelete: () => void
}

export const HttpResponseFloatPannelLayout: React.FC<HttpResponseFloatPannelLayoutProps> = ({ payload, onChange, onDelete }) => {
    const onFinish = (payload: HttpResponseNodePayload) => {
        onChange(payload)
    };

    return (
        <Form
            name="webhook"
            layout="vertical"
            onFinish={onFinish}
        >

            <Form.Item
                label="http 狀態碼"
                name="statusCode"
                rules={[{ required: true, message: 'Please select http statusCode!' }]}
                initialValue={payload.statusCode}
            >
                <Select  >
                    <Option value={200} >200</Option>
                    <Option value={400} >400</Option>
                    <Option value={401} >401</Option>
                    <Option value={500} >500</Option>
                </Select>
            </Form.Item>


            <Form.Item
                label={`回傳資料，使用 \${some varaible} 可取用變數資料`}
                name="responseData"
                rules={[{ required: true, message: 'Please input webhook url!' }]}
                initialValue={payload.responseData}
            >
                <Input placeholder={`請輸入回傳資料，若要取用變數使用\${some varaible}"`} />
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