import React from 'react'
import { Layout, Menu } from 'antd'
import { AppstoreOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
const { Sider } = Layout

export default function NavBar() {
    return (
        <Sider theme="light" collapsible>
            <h1 style={{ padding: "1rem" }}>Logo</h1>
            <Menu theme="light" mode="inline">
                <Menu.Item icon={<AppstoreOutlined />} key="home">
                    <Link to="/">
                        <span>home</span>
                    </Link>
                </Menu.Item>
                <Menu.Item icon={<AppstoreOutlined />} key="page1">
                    <Link to="/page1">
                        <span>page1</span>
                    </Link>
                </Menu.Item>
                <Menu.Item icon={<AppstoreOutlined />} key="page2">
                    <Link to="/page2">
                        <span>page2</span>
                    </Link>
                </Menu.Item>
                <Menu.Item icon={<AppstoreOutlined />} key="page3">
                    <Link to="/page3">
                        <span>page3</span>
                    </Link>
                </Menu.Item>
            </Menu>
        </Sider>
    )
}
