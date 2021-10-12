import React from "react";
import styles from "./OrderContainer.module.scss";

const OrderContainer = ({ children, data, name }) => {
    if (data !== "undefined") {
        return (
            <div className={styles.pointContainer}>
                <span className={styles.point}>{name}</span>
                <span className={styles.dots}></span>
                <span className={styles.text}>{data}</span>
            </div>
        );
    }

    return <></>;
};

export default OrderContainer;
