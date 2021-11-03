import React from "react";
import classNames from "classnames";
import styles from "./OrderContainer.module.scss";

const OrderContainer = ({ children, data, name }) => {
    const textClass = classNames({
        [`${styles.text}`]: true,
        [`${styles.textLowerFont}`]: data.length > 30,
    });
    if (data) {
        return (
            <div className={styles.pointContainer}>
                <span className={styles.point}>{name}</span>
                <span className={styles.dots}></span>
                <span className={textClass}>{data}</span>
            </div>
        );
    }

    return <></>;
};

export default OrderContainer;
