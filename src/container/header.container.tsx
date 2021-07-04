import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Popover } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import React from 'react'
import auth from '../utils/auth';

interface HeaderContainerProps {

}

const HeaderContainer: React.FC<HeaderContainerProps> = ({ }) => {
    const user = auth.getCurrentUser();
    const content = (
        <div>
            {user &&
                <div>
                    <Button style={{ width: "100%" }} onClick={() => auth.logout()}>登出</Button>
                </div>
            }
        </div>
    );

    return (
        <Header style={{ background: "rgb(44,44,44)", textAlign: "right", color: "white" }}>
            <div style={{ float: "left" }}>BotBuilder</div>
            <Popover content={content} title={`您好 ${user.name}`}>
                <Avatar style={{ marginRight: "0.5rem" }} size={32} icon={<UserOutlined />} />
                <span>{user.name}</span>
            </Popover>
        </Header >
    );
}

export default HeaderContainer;