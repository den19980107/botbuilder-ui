import { Button, Form, Input, Select } from 'antd';
import React from 'react'

const { Option } = Select

interface HttpResponsePayload {
    statusCode: number,
    responseData: any
}

interface HttpResponseFloatPannelLayoutProps {
    payload: HttpResponsePayload,
    onChange: (payload: HttpResponsePayload) => void,
    onDelete: () => void
}

export const HttpResponseFloatPannelLayout: React.FC<HttpResponseFloatPannelLayoutProps> = ({ payload, onChange, onDelete }) => {
    const onFinish = (payload: HttpResponsePayload) => {
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
                label={`回傳資料，加上"#FLOW_SHARE_VARIABLE"可取用變數資料`}
                name="responseData"
                rules={[{ required: true, message: 'Please input webhook url!' }]}
                initialValue={payload.responseData}
            >
                <Input placeholder={`請輸入回傳資料，若要取用變數，在變數名稱前方加上 "#FLOW_SHARE_VARIABLE."`} />
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