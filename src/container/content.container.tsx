import React from 'react'
import { Content } from 'antd/lib/layout/layout';
import ContentRouter from './content.router';

interface ContentContainerProps {
}

const ContentContainer: React.FC<ContentContainerProps> = ({ }) => {
    return (
        <Content>
            <div style={{ background: "#fff", height: "91vh" }}>
                <ContentRouter></ContentRouter>
            </div>
        </Content>
    );
}

export default ContentContainer;