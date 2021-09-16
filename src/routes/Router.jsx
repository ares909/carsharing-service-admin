import React from "react";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage.jsx";

function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={MainPage} />
            </Switch>
        </BrowserRouter>
    );
}

export default Router;
