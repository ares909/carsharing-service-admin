import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, useRouteMatch, Switch, useParams, Redirect } from "react-router-dom";
import classNames from "classnames";
import Login from "../Login/Login.jsx";
import NavBar from "../../Common/NavBar/NavBar.jsx";
import { navButtonsAdmin } from "../../Common/NavBar/NavButtons.jsx";
import AdminHeader from "../Common/AdminHeader/AdminHeader.jsx";
import AdminFooter from "../Common/AdminFooter/AdminFooter.jsx";
import OrderList from "../OrderList/OrderList.jsx";
import CarList from "../CarList/CarList.jsx";
import ErrorPage from "../ErrorPage/ErrorPage.jsx";
import OrderPage from "../OrderPage/OrderPage.jsx";
import CarPage from "../CarPage/CarPage.jsx";
import NewCarPage from "../CarPage/NewCarPage.jsx";
import CitiesList from "../CitiesList/CitiesList.jsx";
import CityPage from "../CityPage/CityPage.jsx";
import RateList from "../RateList/RateList.jsx";
import useModal from "../../../hooks/useModal";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import styles from "./AdminContent.module.scss";

const AdminContent = () => {
    const pageRef = useRef(null);
    const [isFormOpened, openForm] = useModal();
    const [isDropDownOpened, toggleDropDown] = useModal();
    useOnClickOutside(pageRef, () => {
        if (isDropDownOpened) {
            toggleDropDown();
        }
    });
    const handleModalClick = () => {
        if (!isFormOpened) openForm();
    };
    // const outSideDropDownClick = (e) => {
    //     if (isDropDownOpened && e.target.classList.length !== 0 && !e.target.className.includes("dropdown")) {
    //         toggleDropDown();
    //     }
    // };
    // useEffect(() => {
    //     document.addEventListener("click", outSideDropDownClick, true);

    //     return () => {
    //         document.removeEventListener("click", outSideDropDownClick, true);
    //     };
    // });

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
                <AdminHeader
                    onClick={handleModalClick}
                    isOpened={isDropDownOpened}
                    toggle={toggleDropDown}
                    innerRef={pageRef}
                />
                <Switch>
                    <Route exact path={`${match.url}`} component={Login} />
                    <Route exact path={`${match.url}/orderlist`} component={OrderList} />
                    <Route exact path={`${match.url}/carlist`} component={CarList} />
                    <Route exact path={`${match.url}/citylist`} component={CitiesList} />
                    <Route exact path={`${match.url}/ratelist`} component={RateList} />
                    <Route exact path={`${match.url}/carcard`} component={NewCarPage} />
                    <Route exact path={`${match.url}/citylist/:cityId?`} component={CityPage} />
                    <Route path={`${match.url}/orderlist/:orderId?`} component={OrderPage} />
                    <Route path={`${match.url}/carlist/:carId?`} component={CarPage} />
                    <Route path={`${match.url}/error`} component={ErrorPage} />
                    <Route component={ErrorPage} />
                </Switch>
                <AdminFooter />
            </div>
        </div>
    );
};

export default AdminContent;
