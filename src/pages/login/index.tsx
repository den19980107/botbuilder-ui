import React from 'react'
import { Button, Form, Input, message } from 'antd'
import Auth from '../../utils/auth'
import history from '../../history';

export default function index() {
    const onFinish = (values: any) => {
        Auth.login(values.username, values.password)
    };

    const onFinishFailed = (errorInfo: any) => {
        const errorFields = errorInfo.errorFields;
        errorFields.forEach(field => {
            message.warn(field.errors[0])
        });
    };
    return (
        <div style={{ width: "70%", margin: "auto" }}>
            <h1>Login</h1>
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
                        Login
                    </Button>
                    <Button onClick={() => history.push("/register")}>Register</Button>
                </Form.Item>
            </Form>
        </div>
    )
}
