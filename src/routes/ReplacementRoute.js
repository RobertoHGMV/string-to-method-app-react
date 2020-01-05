import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { isAuthenticated } from './auth';

const ReplacementRoute = ({ component: Component, ...rest }) => (
    <Route 
        {...rest}
        render = {props => 
            isAuthenticated() 
                ? (<Component {...props} />)
                : (<Redirect to={{ pathname: "/app", state: { from: props.location } }} />)
        }
    />
);

export default ReplacementRoute;