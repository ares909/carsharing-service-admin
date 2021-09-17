import React from "react";
import { Switch, Route, Redirect, HashRouter } from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage.jsx";

function Router() {
    return (
        <HashRouter>
            <Switch>
                <Route exact path="/" component={MainPage} />
            </Switch>
        </HashRouter>
    );
}

export default Router;
