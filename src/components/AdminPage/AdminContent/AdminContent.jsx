import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, useRouteMatch, Switch, useParams } from "react-router-dom";
import classNames from "classnames";
import Login from "../Login/Login.jsx";
import NavBar from "../../Common/NavBar/NavBar.jsx";
import { navButtonsAdmin } from "../../Common/NavBar/NavButtons.jsx";
import AdminHeader from "../Common/AdminHeader/AdminHeader.jsx";
import AdminFooter from "../Common/AdminFooter/AdminFooter.jsx";
import OrderList from "../OrderList/OrderList.jsx";
import styles from "./AdminContent.module.scss";

const AdminContent = () => {
    const match = useRouteMatch();
    return (
        <div className={styles.adminContent}>
            <NavBar type="admin" data={navButtonsAdmin} />
            <div className={styles.contentBox}>
                <AdminHeader />
                <Switch>
                    <Route exact path={`${match.url}`} component={Login} />
                    <Route path={`${match.url}/orderlist`} component={OrderList} />
                </Switch>
                <AdminFooter />
            </div>
        </div>
    );
};

export default AdminContent;
