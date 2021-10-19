import React from "react";
import { Switch, Route, HashRouter } from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage.jsx";
import OrderPage from "../pages/OrderPage/OrderPage.jsx";

const Router = () => (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={MainPage} />
            <Route path="/order" component={OrderPage} />
        </Switch>
    </HashRouter>
);

export default Router;
