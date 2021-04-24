import React from 'react'
import { Route, Switch } from 'react-router-dom';

// pages
import { HomePage } from '../pages/home'
import { CreateBotPage } from '../pages/createBot'
import { NotfoundPage } from '../pages/notfound'
import { UpdateBotPage } from '../pages/updateBot';
import { Database } from '../pages/database';
import { Table } from '../pages/table';

interface ContentRouterProps {

}

const ContentRouter: React.FC<ContentRouterProps> = ({ }) => {
    return (
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/bot/create" component={CreateBotPage}></Route>
            <Route exact path="/bot/update/:id" component={UpdateBotPage}></Route>
            <Route exact path="/database" component={Database}></Route>
            <Route exact path="/database/table/:id" component={Table}></Route>
            <Route exact component={NotfoundPage} />
        </Switch>
    )
}

export default ContentRouter;