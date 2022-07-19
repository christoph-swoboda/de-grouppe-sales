import { Route, Navigate } from 'react-router-dom';
import React from "react";

export { PrivateRoute };

function PrivateRoute({ component: Component, ...rest }) {

    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <Route {...rest} render={props => {
            if (user) {
                // not logged in so redirect to login page
                return <Navigate to="/login"/>
            }
            // authorized so return component
            return <Component {...props} />
        }} />
    );
}