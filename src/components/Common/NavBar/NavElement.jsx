import React, { useEffect } from "react";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import classNames from "classnames";
import useFormComplete from "../../../hooks/useFormComplete";
import navArrow from "../../../images/navbar/navArrow.svg";

const NavElement = ({ styles, link }) => {
    const location = useLocation();
    const [complete, toggle] = useFormComplete();

    useEffect(() => {
        if (location.pathname === link.route) {
            toggle();
        }
    }, [location.pathname]);
    return (
        <>
            <NavLink
                // complete={complete}
                key={link.title}
                exact
                className={classNames({
                    [`${styles.formLinkActive}`]: location.pathname === link.route,
                    [`${styles.formLink}`]: location.pathname !== link.route && complete,
                    [`${styles.formLinkDisabled}`]: location.pathname !== link.route && !complete,
                })}
                to={{ pathname: link.route }}
            >
                {link.title}
            </NavLink>
            <img key={link.route} className={styles.navArrow} src={navArrow} />
        </>
    );
};

export default NavElement;
