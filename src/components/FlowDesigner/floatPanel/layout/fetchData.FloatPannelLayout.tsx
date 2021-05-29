import { Button, Form, Input, Select, Checkbox, AutoComplete } from 'antd';
import React from 'react'
import { Constants, FetchDataNodePayload } from 'botbuilder-share';
import { AutoCompleteWithScriptResource } from '../../components/autoCompleteWithScriptResource';
import { DefindVariableInput } from '../../components/defindVariableInput';
import { v4 as uuid } from 'uuid'
const { HttpMethods } = Constants
const { Option } = Select
const { TextArea } = Input;


interface FetchDataFloatPannelLayoutProps {
    payload: FetchDataNodePayload,
    nodeId: string,
    onChange: (payload: FetchDataNodePayload) => void,
    onDelete: () => void
}

export const FetchDataFloatPannelLayout: React.FC<FetchDataFloatPannelLayoutProps> = ({ payload, nodeId, onChange, onDelete }) => {
    console.log(payload)
    const onFinish = (payload: FetchDataNodePayload) => {
        console.log(payload)
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
                <AutoCompleteWithScriptResource nodeId={nodeId} placeholder="請輸入 url"></AutoCompleteWithScriptResource>
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
                <AutoCompleteWithScriptResource nodeId={nodeId}>
                    < TextArea />
                </AutoCompleteWithScriptResource>
            </Form.Item>
            <Form.Item
                label="使用表單來傳送"
                name="postInForm"
                valuePropName="checked"
                initialValue={payload.postInForm}
            >
                < Checkbox />
            </Form.Item>
            <Form.Item
                label="header 內容"
                name="headers"
                initialValue={payload.headers}
            >
                <AutoCompleteWithScriptResource nodeId={nodeId}>
                    < TextArea />
                </AutoCompleteWithScriptResource>
            </Form.Item>

            <Form.Item
                label="定義一個變數來儲存 fetch 結果"
                name="storeDataAt"
                initialValue={payload.storeDataAt}
            >
                <DefindVariableInput nodeId={nodeId} type="flowVariable"></DefindVariableInput>
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