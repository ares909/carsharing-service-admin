import React from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { apiData } from "../../../store/selectors/selectors";
import navArrow from "../../../images/navbar/navArrow.svg";
import styles from "./Navbar.module.scss";

const NavBar = ({ data, type }) => {
    const validationState = useSelector((state) => state.validation);
    const location = useLocation();
    const { order } = useSelector(apiData);
    const orderLinkClassName = classNames({
        [`${styles.formLinkActive}`]: location.pathname === "/order",
        [`${styles.formLink}`]: location.pathname !== "/order" && validationState.locationValid === true,
        [`${styles.formLinkDisabled}`]: location.pathname !== "/order" && validationState.locationValid === false,
    });

    const modelLinkClassName = classNames({
        [`${styles.formLinkActive}`]: location.pathname === "/order/model",
        [`${styles.formLink}`]: location.pathname !== "/order/model" && validationState.modelValid === true,
        [`${styles.formLinkDisabled}`]: location.pathname !== "/order/model" && validationState.modelValid === false,
    });

    const extraLinkClassName = classNames({
        [`${styles.formLinkActive}`]: location.pathname === "/order/extra",
        [`${styles.formLink}`]: location.pathname !== "/order/extra" && validationState.extraValid === true,
        [`${styles.formLinkDisabled}`]: location.pathname !== "/order/extra" && validationState.extraValid === false,
    });

    const totalClassName = classNames({
        [`${styles.formLinkActive}`]: location.pathname === "/order/total",
        [`${styles.formLink}`]: location.pathname !== "/order/total" && validationState.totalValid === true,
        [`${styles.formLinkDisabled}`]: location.pathname !== "/order/total" && validationState.totalValid === false,
    });

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
                    {order.orderId && location.pathname === `/order/confirmed/${order.orderId}` ? (
                        <div className={styles.orderNumber}>{`Заказ №${order.orderId}`}</div>
                    ) : (
                        <div className={styles.formNavbarContainer}>
                            <NavLink exact className={orderLinkClassName} to={{ pathname: "/order" }}>
                                Местоположение
                            </NavLink>
                            <img className={styles.navArrow} src={navArrow} />
                            <NavLink exact className={modelLinkClassName} to={{ pathname: "/order/model" }}>
                                Модель
                            </NavLink>
                            <img className={styles.navArrow} src={navArrow} />
                            <NavLink exact className={extraLinkClassName} to={{ pathname: "/order/extra" }}>
                                Дополнительно
                            </NavLink>
                            <img className={styles.navArrow} src={navArrow} />
                            <NavLink exact className={totalClassName} to={{ pathname: "/order/total" }}>
                                Итого
                            </NavLink>
                            <img className={styles.navArrow} src={navArrow} />
                        </div>
                    )}
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
