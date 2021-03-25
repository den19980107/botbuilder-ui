import { Footer } from 'antd/lib/layout/layout'
import React from 'react'

interface FooterContainerProps {

}

const FooterContainer: React.FC<FooterContainerProps> = ({ }) => {
    return (
        <Footer style={{ textAlign: "center" }}>
            Copyright © 2021 Paul Tseng All rights reserved.
        </Footer>
    );
}

export default FooterContainer;