import React from "react";
import locationImage from "../../images/header/locationImage.svg";
import { burgerMenuButtonBlack } from "../../constants/constants";
import Button from "../UI/Button.jsx";

function Header({ toggle }) {
    return (
        <>
            <header className="header">
                <div className="header__container">
                    <h2 className="header__title">Need for drive</h2>
                    <div className="header__location-container">
                        <Button toggle={toggle} className="header__button">
                            {burgerMenuButtonBlack}
                        </Button>
                        <img className="header__location-image" src={locationImage} alt="лого" />
                        <p className="header__location-text">Ульяновск</p>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;
