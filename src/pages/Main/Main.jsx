import React from "react";
import Footer from "../../components/Footer/Footer.jsx";
import Header from "../../components/Header/Header.jsx";
import SideBar from "../../components/SideBar/SideBar.jsx";
import Button from "../../components/UI/Button.jsx";

function Main() {
    return (
        <>
            <section className="main">
                <SideBar />
                <div className="main__container">
                    <Header />
                    <div className="main__title-container">
                        <h1 className="main__title">Каршеринг</h1>
                        <h2 className="main__title main__title_green">Need for drive</h2>
                        <p className="main__text">Поминутная аренда авто твоего города</p>
                        <Button className="main__button" name="Забронировать" />
                    </div>
                    <Footer />
                </div>
            </section>
        </>
    );
}

export default Main;
