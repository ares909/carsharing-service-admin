import React from "react";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import Main from "../pages/Main/Main.jsx";

function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Main} />
            </Switch>
        </BrowserRouter>
    );
}

export default Router;
