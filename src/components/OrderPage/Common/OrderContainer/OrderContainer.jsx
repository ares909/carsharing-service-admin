import React from "react";
import styles from "./OrderContainer.module.scss";

const OrderContainer = ({ children, data, name }) => {
    return (
        <div className={styles.pointContainer}>
            <span className={styles.point}>{name}</span>
            <span className={styles.dots}></span>
            <div className={styles.text}>
                <p className={styles.textPart}>{data}</p>
                {/* <p className={styles.textPart}>{stateForm.point}</p> */}
            </div>
        </div>
    );
};

export default OrderContainer;
