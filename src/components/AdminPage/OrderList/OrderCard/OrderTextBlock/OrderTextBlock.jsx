import React from "react";
import styles from "./OrderTextBlock.module.scss";

const OrderTextBlock = ({ label, data, className }) => (
    <div className={className}>
        <p className={styles.orderText}>{label}</p>
        <span className={styles.orderTextBold}>{data}</span>
    </div>
);

export default OrderTextBlock;
