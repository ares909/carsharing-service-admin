import React from "react";
import { useLocation } from "react-router";
import classNames from "classnames";
import Button from "../UI/Button.jsx";
import burgerMenuButtonBlack from "./BurgerMenuButtonBlack.jsx";
import locationImage from "../../../images/header/locationImage.svg";
import styles from "./Header.module.scss";

const Header = ({ toggle }) => {
    const location = useLocation();
    return (
        <header
            className={classNames({
                [`${styles.header}`]: true,
                [`${styles.formHeader}`]: location.pathname !== "/",
            })}
        >
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
