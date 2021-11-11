import React from "react";
import classNames from "classnames";
import { useLocation } from "react-router";
import Navbar from "../NavBar/NavBar.jsx";
import crossButton from "../UI/CrossButton/CrossButton.jsx";
import Button from "../UI/Button.jsx";
import { navButtonsVertical, navButtonsHorizontal } from "../NavBar/NavButtons.jsx";
import styles from "./PopupMenu.module.scss";

const PopupMenu = ({ toggle, isOpened }) => {
    const location = useLocation();
    const className = classNames({
        [`${styles.popupMenu}`]: true,
        [`${styles.active}`]: isOpened,
    });

    const wrapper = classNames({
        [`${styles.wrapper}`]: true,
        [`${styles.wrapperOrder}`]: location.pathname !== "/",
    });

    return (
        <section className={className}>
            <div className={wrapper}>
                <Button toggle={toggle} className={styles.crossButton}>
                    {crossButton}
                </Button>
                <div className={styles.container}>
                    <Navbar data={navButtonsVertical} />
                    <Navbar data={navButtonsHorizontal} type="horizontal" />
                </div>
                <Button name="Eng" className={styles.buttonGreen} />
            </div>
        </section>
    );
};

export default PopupMenu;
