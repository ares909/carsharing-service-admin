import React from "react";
import Footer from "../Footer/Footer.jsx";
import Header from "../Header/Header.jsx";
import Button from "../UI/Button.jsx";

function Main({ isOpened }) {
    return (
        <div className={`main ${isOpened ? "main_disabled" : ""}`}>
            <Header />
            <div className="main__title-container">
                <h1 className="main__title">Каршеринг</h1>
                <h2 className="main__title main__title_green">Need for drive</h2>
                <p className="main__text">Поминутная аренда авто твоего города</p>
                <Button className="main__button" name="Забронировать" />
            </div>
            <Footer />
        </div>
    );
}

export default Main;
