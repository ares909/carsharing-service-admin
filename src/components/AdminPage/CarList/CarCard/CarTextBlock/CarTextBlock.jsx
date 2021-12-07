import React from "react";
import styles from "./CarTextBlock.module.scss";

const CarTextBlock = ({ label, data, className, descriptionClassName }) => (
    <div className={className}>
        <p className={styles.carText}>{label}</p>
        <span className={descriptionClassName || styles.carTextBold}>{data}</span>
    </div>
);

export default CarTextBlock;
