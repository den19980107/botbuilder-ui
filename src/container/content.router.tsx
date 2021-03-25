import React from 'react'
import { Route, Switch } from 'react-router-dom';

// pages
import HomePage from '../pages/home'
import NotFoundPage from '../pages/notfound'

interface ContentRouterProps {

}

const ContentRouter: React.FC<ContentRouterProps> = ({ }) => {
    return (
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact component={NotFoundPage} />
        </Switch>
    )
}

export default ContentRouter;