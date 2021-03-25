import React from 'react'
import { Content } from 'antd/lib/layout/layout';
import ContentRouter from './content.router';

interface ContentContainerProps {
}

const ContentContainer: React.FC<ContentContainerProps> = ({ }) => {
    return (
        <Content style={{ padding: "1rem" }}>
            <div style={{ padding: 16, background: "#fff", minHeight: "75vh" }}>
                <ContentRouter></ContentRouter>
            </div>
        </Content>
    );
}

export default ContentContainer;