import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import classNames from "classnames";
import NavBar from "../../../Common/NavBar/NavBar.jsx";
import { navButtonsFooter } from "../../../Common/NavBar/NavButtons.jsx";
import styles from "./AdminFooter.module.scss";

const AdminFooter = () => {
    const location = useLocation();
    return (
        location.pathname !== "/admin" && (
            <footer className={styles.adminFooter}>
                <div className={styles.container}>
                    <NavBar data={navButtonsFooter} type="footer" />
                    <p className={styles.text}>Copyright © 2020 Simbirsoft</p>
                </div>
            </footer>
        )
    );
};
export default AdminFooter;
