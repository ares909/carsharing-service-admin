import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import classNames from "classnames";
import notificationIcon from "../../../../images/admin/notificationIcon.svg";
import avatarImage from "../../../../images/admin/avatarImage.jpg";
import styles from "./AdminHeader.module.scss";
import Button from "../../../Common/UI/Button.jsx";
import burgerMenuButton from "./burgerMenuButton.jsx";

const AdminHeader = ({ onClick }) => {
    const { push } = useHistory();
    const logout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("token");
        push("/");
    };
    const location = useLocation();
    let title;
    switch (location.pathname) {
        case "/admin/orderlist":
            title = "Заказы";
            break;
        case "/admin/carlist":
            title = "Автомобили";
            break;

        default:
            title = "";
            break;
    }

    return (
        location.pathname !== "/admin" && (
            <header className={styles.adminHeader}>
                <Button className={styles.button} onClick={onClick}>
                    <div className={styles.buttonImage}>{burgerMenuButton}</div>
                </Button>
                <div className={styles.titleBar}>
                    <h1 className={styles.listTitle}>{title}</h1>
                </div>
                <div className={styles.notifications}>
                    <img className={styles.notificationImage} src={notificationIcon} />
                    <div className={styles.notoficationCount}>{12}</div>
                </div>
                <div className={styles.profile}>
                    <img className={styles.avatar} src={avatarImage} />
                    <p className={styles.profileName}>Admin</p>
                    <Button className={styles.profileButton} name="Выйти" onClick={logout} />
                </div>
            </header>
        )
    );
};

export default AdminHeader;
