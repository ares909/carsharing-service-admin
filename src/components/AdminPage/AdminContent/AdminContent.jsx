import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, useRouteMatch, Switch, useParams, Redirect } from "react-router-dom";
import classNames from "classnames";
import Login from "../Login/Login.jsx";
import NavBar from "../../Common/NavBar/NavBar.jsx";
import { navButtonsAdmin } from "../../Common/NavBar/NavButtons.jsx";
import AdminHeader from "../Common/AdminHeader/AdminHeader.jsx";
import AdminFooter from "../Common/AdminFooter/AdminFooter.jsx";
import OrderList from "../OrderList/OrderList.jsx";
import useModal from "../../../hooks/useModal";
import styles from "./AdminContent.module.scss";
import ErrorPage from "../ErrorPage/ErrorPage.jsx";

const AdminContent = () => {
    const [isFormOpened, openForm] = useModal();
    const handleModalClick = () => {
        if (!isFormOpened) openForm();
    };

    const wrapperClassName = classNames({
        [`${styles.formWrapper}`]: true,
        [`${styles.formWrapperActive}`]: isFormOpened,
    });
    const match = useRouteMatch();
    return (
        <div className={styles.adminContent}>
            <div className={wrapperClassName}>
                <NavBar type="admin" data={navButtonsAdmin} isFormOpened={isFormOpened} openForm={openForm} />
            </div>
            <div className={styles.contentBox}>
                <AdminHeader onClick={handleModalClick} />
                <Switch>
                    <Route exact path={`${match.url}`} component={Login} />
                    <Route path={`${match.url}/orderlist`} component={OrderList} />
                    <Route path={`${match.url}/error`} component={ErrorPage} />
                    <Route path="*">
                        <Redirect to={`${match.url}/error`} />
                    </Route>
                </Switch>
                <AdminFooter />
            </div>
        </div>
    );
};

export default AdminContent;
