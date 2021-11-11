import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import classNames from "classnames";
import searchIcon from "../../../../images/admin/searchIcon.svg";
import notificationIcon from "../../../../images/admin/notificationIcon.svg";
import avatarImage from "../../../../images/admin/avatarImage.jpg";
import dropdownIcon from "../../../../images/admin/dropdownIcon.svg";
import styles from "./AdminHeader.module.scss";

const AdminHeader = () => {
    const location = useLocation();
    return (
        location.pathname !== "/admin" && (
            <header className={styles.adminHeader}>
                <div className={styles.searchBar}>
                    <img className={styles.searchIcon} src={searchIcon} />
                    <input type="search" placeholder="Поиск ..." className={styles.searchInput} />
                </div>
                <div className={styles.notifications}>
                    <img className={styles.notificationImage} src={notificationIcon} />
                    <div className={styles.notoficationCount}>{12}</div>
                </div>
                <div className={styles.profile}>
                    <img className={styles.avatar} src={avatarImage} />
                    <p className={styles.profileName}>Admin</p>
                    <button className={styles.profileButton}>
                        <img className={styles.profileButtonImage} src={dropdownIcon} />
                    </button>
                </div>
            </header>
        )
    );
};

export default AdminHeader;
