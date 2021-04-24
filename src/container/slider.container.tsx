import { RobotOutlined, AppstoreOutlined, DatabaseOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import React from 'react'
import { Link } from 'react-router-dom';

interface SliderContainerProps {

}

const SliderContainer: React.FC<SliderContainerProps> = ({ }) => {
    return (
        <Sider theme="light" collapsible>
            <h1 style={{ padding: "1rem" }}>Logo</h1>
            <Menu theme="light" mode="inline">
                <Menu.Item icon={<RobotOutlined />} key="home">
                    <Link to="/">
                        <span>機器人清單</span>
                    </Link>
                </Menu.Item>
                <Menu.Item icon={<DatabaseOutlined />} key="database">
                    <Link to="/database">
                        <span>資料表</span>
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
    );
}

export default SliderContainer;