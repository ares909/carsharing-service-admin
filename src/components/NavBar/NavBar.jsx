import React from "react";
import { NavLink, Link } from "react-router-dom";

function NavBar({ data, type }) {
    return type === "horizontal" ? (
        <nav className={`navbar ${type === "horizontal" ? "navbar_horizontal" : ""}`}>
            {data.map((link) => (
                <a
                    key={link.title}
                    className="navbar__link navbar__link_horizontal"
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                >
                    <div className="navbar__link-image">{link.image}</div>
                </a>
            ))}
        </nav>
    ) : (
        <nav className={`navbar ${type === "horizontal" ? "navbar_horizontal" : ""}`}>
            {data.map((link) => (
                <NavLink key={link.title} className="navbar__link" to="/">
                    {link.title}
                </NavLink>
            ))}
        </nav>
    );
}

export default NavBar;
