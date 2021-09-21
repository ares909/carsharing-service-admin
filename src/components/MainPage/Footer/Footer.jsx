import React from "react";
import styles from "./Footer.module.scss";

const Footer = () => (
    <footer className={styles.footer}>
        <div className={styles.container}>
            <p className={styles.textGrey}>© 2016-2019 «Need for drive»</p>
            <p className={styles.text}>8 (495) 234-22-44</p>
        </div>
    </footer>
);

export default Footer;
