import React from "react";
import { NavLink } from "react-router-dom";
import navArrow from "../../../images/navbar/navArrow.svg";
import styles from "./Navbar.module.scss";

const NavBar = ({ data, type }) => {
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
                    {data.map((link, i) => (
                        <>
                            <NavLink
                                key={link.title}
                                className={styles.formLink}
                                exact
                                activeClassName={styles.formLinkActive}
                                to={link.route}
                            >
                                {link.title}
                            </NavLink>
                            <img key={link.route} className={styles.navArrow} src={navArrow} />
                        </>
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
