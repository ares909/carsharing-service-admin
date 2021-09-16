import React from "react";
import Navbar from "../NavBar/NavBar.jsx";
import { navButtonsVertical, navButtonsHorizontal, crossButton } from "../../constants/constants";
import Button from "../UI/Button.jsx";

function PopupMenu({ toggle, isOpened }) {
    return (
        <section className={`popup-menu ${isOpened ? "popup-menu_active" : ""}`}>
            <div className="popup-menu__wrapper">
                <Button toggle={toggle} className="popup-menu__cross-button">
                    {crossButton}
                </Button>
                <div className="popup-menu__container">
                    <Navbar data={navButtonsVertical} />
                    <Navbar data={navButtonsHorizontal} type="horizontal" />
                </div>
            </div>
        </section>
    );
}

export default PopupMenu;
