import { RobotOutlined, AppstoreOutlined, DatabaseOutlined, PlusOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface SliderContainerProps {

}

const SliderContainer: React.FC<SliderContainerProps> = ({ }) => {
    const [collapsed, setCollapsed] = useState(false)
    return (
        <Sider theme="light" collapsible collapsed={collapsed} onCollapse={(isCollapsible) => setCollapsed(isCollapsible)}>
            <Menu theme="light" mode="inline">
                <Menu.Item icon={<PlusOutlined />} key="create">
                    <Link to="/bot/create" style={{ width: "1rem", margin: "auto" }}>
                        {!collapsed && <span>新增</span>}
                    </Link>
                </Menu.Item>
                <Menu.Item icon={<RobotOutlined />} key="home">
                    <Link to="/">
                        {!collapsed && <span>腳本清單</span>}
                    </Link>
                </Menu.Item>
                <Menu.Item icon={<DatabaseOutlined />} key="database">
                    <Link to="/database">
                        {!collapsed && <span>資料表</span>}
                    </Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
}

export default SliderContainer;