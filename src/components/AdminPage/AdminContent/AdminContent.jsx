import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, useRouteMatch, Switch, useParams, Redirect } from "react-router-dom";
import classNames from "classnames";
import Login from "../Login/Login.jsx";
import NavBar from "../../Common/NavBar/NavBar.jsx";
import { navButtonsAdmin } from "../../Common/NavBar/NavButtons.jsx";
import AdminHeader from "../Common/AdminHeader/AdminHeader.jsx";
import AdminFooter from "../Common/AdminFooter/AdminFooter.jsx";
import OrderList from "../OrderList/OrderList.jsx";
import ErrorPage from "../ErrorPage/ErrorPage.jsx";
import OrderPage from "../OrderPage/OrderPage.jsx";
import useModal from "../../../hooks/useModal";
import styles from "./AdminContent.module.scss";

const AdminContent = () => {
    const [isFormOpened, openForm] = useModal();
    const [isDropDownOpened, toggleDropDown] = useModal();
    const handleModalClick = () => {
        if (!isFormOpened) openForm();
    };
    const outSideDropDownClick = (e) => {
        if (isDropDownOpened && e.target.classList.length !== 0 && !e.target.className.includes("dropdown")) {
            toggleDropDown();
        }
    };
    useEffect(() => {
        document.addEventListener("click", outSideDropDownClick, true);

        return () => {
            document.removeEventListener("click", outSideDropDownClick, true);
        };
    });

    const wrapperClassName = classNames({
        [`${styles.formWrapper}`]: true,
        [`${styles.formWrapperActive}`]: isFormOpened,
    });

    const match = useRouteMatch();
    return (
        <div className={styles.adminContent} onClick={outSideDropDownClick}>
            <div className={wrapperClassName}>
                <NavBar type="admin" data={navButtonsAdmin} isFormOpened={isFormOpened} openForm={openForm} />
            </div>
            <div className={styles.contentBox}>
                <AdminHeader onClick={handleModalClick} isOpened={isDropDownOpened} toggle={toggleDropDown} />
                <Switch>
                    <Route exact path={`${match.url}`} component={Login} />
                    <Route exact path={`${match.url}/orderlist`} component={OrderList} />
                    <Route path={`${match.url}/orderlist/:orderId?`} component={OrderPage} />
                    <Route path={`${match.url}/error`} component={ErrorPage} />
                    <Route component={ErrorPage} />
                </Switch>
                <AdminFooter />
            </div>
        </div>
    );
};

export default AdminContent;
