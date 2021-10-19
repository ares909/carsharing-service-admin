import React from "react";
import { useSelector } from "react-redux";
import styles from "./PriceContainer.module.scss";

const PriceContainer = ({ price }) => {
    const selectedCar = useSelector((state) => state.form.selectedCar);
    if (selectedCar) {
        return (
            <div className={styles.priceContainer}>
                <p className={styles.priceTitle}>Цена: </p>
                <span className={styles.price}>{price}</span>
            </div>
        );
    }

    return <></>;
};

export default PriceContainer;
