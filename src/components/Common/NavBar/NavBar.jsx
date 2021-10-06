import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import classNames from "classnames";
import { useSelector } from "react-redux";
import navArrow from "../../../images/navbar/navArrow.svg";
import styles from "./Navbar.module.scss";

const NavBar = ({ data, type }) => {
    const stateForm = useSelector((state) => state.form);
    const location = useLocation();

    switch (type) {
        case "horizontal":
            return (
                <nav className={styles.horizontalNavbar}>
                    {data.map((link) => (
                        <a
                            key={link.title}
                            className={styles.horizontalLink}
                            href={link.url}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <div className={styles.linkImage}>{link.image}</div>
                        </a>
                    ))}
                </nav>
            );
        case "form":
            return (
                <nav className={styles.formNavbar}>
                    <div className={styles.formNavbarContainer}>
                        <NavLink
                            // complete={complete}

                            exact
                            className={classNames({
                                [`${styles.formLinkActive}`]: location.pathname === "/order",
                                [`${styles.formLink}`]:
                                    location.pathname !== "/order" && stateForm.locationValid === true,
                                [`${styles.formLinkDisabled}`]:
                                    location.pathname !== "/order" && stateForm.locationValid === false,
                            })}
                            to={{ pathname: "/order" }}
                        >
                            Местоположение
                        </NavLink>
                        <img className={styles.navArrow} src={navArrow} />
                        <NavLink
                            // complete={complete}

                            exact
                            className={classNames({
                                [`${styles.formLinkActive}`]: location.pathname === "/order/model",
                                [`${styles.formLink}`]:
                                    location.pathname !== "/order/model" && stateForm.modelValid === true,
                                [`${styles.formLinkDisabled}`]:
                                    location.pathname !== "/order/model" && stateForm.modelValid === false,
                            })}
                            to={{ pathname: "/order/model" }}
                        >
                            Модель
                        </NavLink>
                        <img className={styles.navArrow} src={navArrow} />
                        <NavLink
                            // complete={complete}

                            exact
                            className={classNames({
                                [`${styles.formLinkActive}`]: location.pathname === "/order/extra",
                                [`${styles.formLink}`]:
                                    location.pathname !== "/order/extra" && stateForm.extraValid === true,
                                [`${styles.formLinkDisabled}`]:
                                    location.pathname !== "/order/extra" && stateForm.extraValid === false,
                            })}
                            to={{ pathname: "/order/extra" }}
                        >
                            Дополнительно
                        </NavLink>
                        <img className={styles.navArrow} src={navArrow} />
                        <NavLink
                            // complete={complete}

                            exact
                            className={classNames({
                                [`${styles.formLinkActive}`]: location.pathname === "/order/total",
                                [`${styles.formLink}`]:
                                    location.pathname !== "/order/total" && stateForm.totalValid === true,
                                [`${styles.formLinkDisabled}`]:
                                    location.pathname !== "/order/tolal" && stateForm.totalValid === false,
                            })}
                            to={{ pathname: "/order/tolal" }}
                        >
                            Итого
                        </NavLink>
                        <img className={styles.navArrow} src={navArrow} />
                    </div>
                </nav>
            );
        default:
            return (
                <nav className={styles.navbar}>
                    {data.map((link) => (
                        <NavLink key={link.title} className={styles.link} to="/">
                            {link.title}
                        </NavLink>
                    ))}
                </nav>
            );
    }
};

export default NavBar;
