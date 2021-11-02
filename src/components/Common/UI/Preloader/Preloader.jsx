import React from "react";
import styles from "./Preloader.module.scss";

const Preloader = () => (
    <div className={styles.preloader}>
        <div className={styles.preloaderContainer}>
            <span className={styles.preloaderRound}></span>
        </div>
    </div>
);

export default Preloader;
