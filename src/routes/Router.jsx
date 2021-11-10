import React from "react";
import { Switch, Route, HashRouter } from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage.jsx";
import OrderPage from "../pages/OrderPage/OrderPage.jsx";
import AdminPage from "../pages/AdminPage/AdminPage.jsx";

const Router = () => (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={MainPage} />
            <Route path="/order" component={OrderPage} />
            <Route path="/admin" component={AdminPage} />
        </Switch>
    </HashRouter>
);

export default Router;
