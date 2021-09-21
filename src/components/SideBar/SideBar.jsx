import React from "react";
import Button from "../UI/Button.jsx";
import burgerMenuButton from "./burgerMenuButton.jsx";
import styles from "./SideBar.module.scss";

const SideBar = ({ toggle }) => (
    <div className={styles.sidebar}>
        <Button toggle={toggle} className={styles.button}>
            <div className={styles.buttonImage}>{burgerMenuButton}</div>
        </Button>
        <Button name="Eng" className={styles.buttonGreen} />
    </div>
);

export default SideBar;
