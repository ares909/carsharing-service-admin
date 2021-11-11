import React from "react";
import { useLocation } from "react-router";
import classNames from "classnames";
import Button from "../UI/Button.jsx";
import burgerMenuButtonBlack from "./BurgerMenuButtonBlack.jsx";
import locationImage from "../../../images/header/locationImage.svg";
import styles from "./Header.module.scss";

const Header = ({ toggle }) => {
    const location = useLocation();
    const headerClassname = classNames({
        [`${styles.header}`]: true,
        [`${styles.formHeader}`]: location.pathname !== "/",
    });
    return (
        <header className={headerClassname}>
            <div className={styles.container}>
                <h2 className={styles.title}>Need for drive</h2>
                <div className={styles.locationContainer}>
                    <Button toggle={toggle} className={styles.button}>
                        {burgerMenuButtonBlack}
                    </Button>
                    <img className={styles.locationImage} src={locationImage} alt="лого" />
                    <p className={styles.locationText}>Ульяновск</p>
                </div>
            </div>
        </header>
    );
};
export default Header;
