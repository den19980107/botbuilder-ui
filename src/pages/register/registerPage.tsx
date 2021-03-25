import React from 'react'
import { Button, Form, Input, message } from 'antd'
import Auth from '../../utils/auth';

interface RegisterPageProps {

}

export const RegisterPage: React.FC<RegisterPageProps> = ({ }) => {

    const onFinish = (values: any) => {
        Auth.register(values.username, values.password)
    };

    const onFinishFailed = (errorInfo: any) => {
        const errorFields = errorInfo.errorFields;
        errorFields.forEach(field => {
            message.warn(field.errors[0])
        });
    };
    return (
        <div style={{ width: "70%", margin: "auto" }}>
            <h1>Register</h1>
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}