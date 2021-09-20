import React from "react";
import Footer from "../Footer/Footer.jsx";
import Header from "../../Header/Header.jsx";
import Button from "../../UI/Button.jsx";
import styles from "./Main.module.scss";

const Main = ({ toggle }) => {
    return (
        <div className={styles.main}>
            <Header toggle={toggle} />
            <main className={styles.titleContainer}>
                <h1 className={styles.title}>Каршеринг</h1>
                <h2 className={styles.titleGreen}>Need for drive</h2>
                <p className={styles.text}>Поминутная аренда авто твоего города</p>
                <Button className={styles.button} name="Забронировать" />
            </main>

            <Footer />
        </div>
    );
};

export default Main;
