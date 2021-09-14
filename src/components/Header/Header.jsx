import React from "react";
import locationImage from "../../images/header/locationImage.svg";

function Header() {
    return (
        <>
            <header className="header">
                <div className="header__container">
                    <h2 className="header__title">Need for drive</h2>
                    <div className="header__location-container">
                        <img className="header__location-image" src={locationImage} />
                        <p className="header__location-text">Ульяновск</p>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;
