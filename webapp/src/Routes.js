import React from 'react';
import {RouteWithLayout} from './component'
import {Gallery,Detail} from './view'
import {MainLayout} from './layout'
import { Switch } from 'react-router-dom';

const Routes = () => {
    return (
        <Switch>
            <RouteWithLayout
                component={Gallery}
                exact
                layout={MainLayout}
                path="/"
            />
            <RouteWithLayout
                component={Detail}
                exact
                layout={MainLayout}
                path="/detail/:id"
            />
        </Switch>

    );
}

export default Routes;