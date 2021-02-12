import React from 'react';
import { Route, Switch } from "react-router-dom";
import { Button, Layout } from 'antd';
import NavBar from './components/NavBar';
import Auth from './utils/auth'
// import Pages
import HomePage from './pages/home';
import NotFoundPage from './pages/notfound';

export default function Routes() {
    return (
        <Layout>
            <NavBar />
            <Layout>
                <Layout.Header style={{ background: '#fff', padding: 0 }} >
                    <Button onClick={() => Auth.logout()}>Logout</Button>
                </Layout.Header>
                <div style={{ margin: '18px 12px 0', minHeight: "76.1vh" }}>
                    <Switch>
                        <Route exact path={"/"} component={HomePage} />
                        <Route exact component={NotFoundPage} />
                    </Switch>
                </div>
            </Layout>
        </Layout>
    )
}
