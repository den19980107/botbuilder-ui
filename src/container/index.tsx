import { BackTop } from 'antd';
import Layout from 'antd/lib/layout/layout';
import React from 'react'
import { Route, Switch } from 'react-router-dom';
import { CreateBotPage } from '../pages/createBot';
import { UpdateBotPage } from '../pages/updateBot';
import ContentContainer from './content.container';
import FooterContainer from './footer.container';
import HeaderContainer from './header.container';
import SliderContainer from './slider.container';

interface IndexProps {

}

const Index: React.FC<IndexProps> = ({ }) => {
    return (
        <Layout style={{ height: "100vh" }}>
            <HeaderContainer></HeaderContainer>
            <Layout>
                <SliderContainer></SliderContainer>
                <Layout>
                    <ContentContainer></ContentContainer>
                </Layout>
            </Layout>
        </Layout>
    );
}

export default Index;