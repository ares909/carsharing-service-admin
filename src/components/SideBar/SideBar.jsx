import React from "react";
import Button from "../UI/Button.jsx";
import { burgerMenuButton } from "../../constants/constants";

function SideBar({ isOpened, toggle }) {
    return (
        <div className={`sidebar ${isOpened ? "sidebar_disabled" : ""}`}>
            {/* <div className="sidebar__container"> */}
            <Button toggle={toggle} className="sidebar__button">
                <div className="sidebar__button-image">{burgerMenuButton}</div>
            </Button>
            <Button name="Eng" className="sidebar__button sidebar__button_green" />
            {/* </div> */}
        </div>
    );
}

export default SideBar;
