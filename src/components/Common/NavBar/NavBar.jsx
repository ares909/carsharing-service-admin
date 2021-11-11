import React from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { apiData } from "../../../store/selectors/selectors";
import navArrow from "../../../images/navbar/navArrow.svg";
import logo from "../../../images/admin/adminLogo.svg";
import styles from "./Navbar.module.scss";

const NavBar = ({ data, type }) => {
    const validationState = useSelector((state) => state.validation);
    const location = useLocation();
    const { order } = useSelector(apiData);

    const adminClassName = classNames({
        [`${styles.adminNavbarContainer}`]: true,
        [`${styles.adminNavbarDisabled}`]: location.pathname === "/admin",
    });

    switch (type) {
        case "admin":
            return (
                <div className={adminClassName}>
                    <div className={styles.adminNavbarLogo}>
                        <div className={styles.logoBox}>
                            <img className={styles.logoImage} src={logo} />
                        </div>
                        <h2 className={styles.logoTitle}>Need for drive</h2>
                    </div>

                    <nav className={styles.adminNavbar}>
                        {data.map((link) => (
                            <NavLink
                                key={link.title}
                                className={styles.adminLinkContainer}
                                activeClassName={styles.adminLinkContainerActive}
                                to={link.route}
                            >
                                <div className={styles.adminLinkImage}>{link.image}</div>
                                <p className={styles.adminLink}>{link.title}</p>
                            </NavLink>
                        ))}
                    </nav>
                </div>
            );
        case "footer":
            return (
                <nav className={styles.footerNavbar}>
                    {data.map((link) => (
                        <NavLink key={link.title} className={styles.footerLink} to={link.route}>
                            {link.title}
                        </NavLink>
                    ))}
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
