import React from "react";
import Button from "../UI/Button.jsx";
import menuButton from "../../images/sidebar/menu_button.svg";

function SideBar() {
    return (
        <div className="sidebar">
            <div className="sidebar__container">
                <Button className="sidebar__button">
                    <img className="sidebar__button-image" src={menuButton} />
                </Button>
                <Button name="Eng" className="sidebar__button sidebar__button_green" />
            </div>
        </div>
    );
}

export default SideBar;
