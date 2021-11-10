import React from "react";
import { Switch, Route, HashRouter } from "react-router-dom";

import AdminPage from "../pages/AdminPage/AdminPage.jsx";

const Router = () => (
    <HashRouter>
        <Switch>
            <Route path="/admin" component={AdminPage} />
        </Switch>
    </HashRouter>
);

export default Router;
