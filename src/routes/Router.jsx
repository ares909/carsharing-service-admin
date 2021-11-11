import React from "react";
import { Switch, Route, HashRouter, Redirect } from "react-router-dom";

import AdminPage from "../pages/AdminPage/AdminPage.jsx";

const Router = () => (
    <HashRouter>
        <Switch>
            <Route exact path="/">
                <Redirect to="/admin" />
            </Route>
            <Route path="/admin" component={AdminPage} />
        </Switch>
    </HashRouter>
);

export default Router;
