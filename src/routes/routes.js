import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import ReplacementRoute from './ReplacementRoute';

import Login from '../pages/Login';
import Replacement from '../pages/Replacement';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/app/" exact component={Login} />
                <ReplacementRoute path="/app/replacement"  component={Replacement} />
            </Switch>
        </BrowserRouter>
    );
};