import { BackTop } from 'antd';
import Layout from 'antd/lib/layout/layout';
import React from 'react'
import ContentContainer from './content.container';
import FooterContainer from './footer.container';
import HeaderContainer from './header.container';
import SliderContainer from './slider.container';

interface IndexProps {

}

const Index: React.FC<IndexProps> = ({ }) => {
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <BackTop></BackTop>
            <SliderContainer></SliderContainer>
            <Layout>
                <HeaderContainer></HeaderContainer>
                <ContentContainer></ContentContainer>
                <FooterContainer></FooterContainer>
            </Layout>
        </Layout>
    );
}

export default Index;