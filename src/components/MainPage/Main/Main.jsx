import React from "react";
import { useHistory } from "react-router";
import Footer from "../Footer/Footer.jsx";
import Header from "../../Common/Header/Header.jsx";
import Button from "../../Common/UI/Button.jsx";
import styles from "./Main.module.scss";

const Main = ({ toggle }) => {
    const { push } = useHistory();
    const handleClick = () => {
        push("./order");
    };
    return (
        <div className={styles.main}>
            <Header toggle={toggle} />
            <main className={styles.titleContainer}>
                <h1 className={styles.title}>Каршеринг</h1>
                <h2 className={styles.titleGreen}>Need for drive</h2>
                <p className={styles.text}>Поминутная аренда авто твоего города</p>
                <Button className={styles.button} onClick={handleClick} name="Забронировать" />
            </main>

            <Footer />
        </div>
    );
};

export default Main;
