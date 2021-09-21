import React from "react";
import { NavLink } from "react-router-dom";
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
