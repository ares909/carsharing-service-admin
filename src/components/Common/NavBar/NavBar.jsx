import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import classNames from "classnames";
import useFormComplete from "../../../hooks/useFormComplete";
import navArrow from "../../../images/navbar/navArrow.svg";
import NavElement from "./NavElement.jsx";
import styles from "./Navbar.module.scss";

const NavBar = ({ data, type }) => {
    const location = useLocation();
    const [complete, toggle] = useFormComplete();
    // const [completed, setCompleted] = useState(false);
    useEffect(() => {
        toggle();
    }, [location.pathname]);

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
                        <NavElement key={link.title} styles={styles} link={link} />
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
