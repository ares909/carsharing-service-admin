import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetFilteredCars, fetchStatuses } from "../../../store/slices/apiSlice";
import useNumberFormat from "../../../hooks/useNumberFormat";
import useDateFormat from "../../../hooks/useDateFormat";
import { imageUrl } from "../../../constants/constants";
import styles from "./TotalStep.module.scss";

const TotalStep = () => {
    const dispatch = useDispatch();
    const [convertNumber, convertCarNumber] = useNumberFormat();
    const [convertDateToSeconds, secondsToDhms, secondsToMinutes, secondsToHours, stringToLocale] = useDateFormat();
    const apiData = useSelector((state) => state.api);
    const formData = useSelector((state) => state.form);
    const [orderData, setOrderData] = useState({ tank: "", date: "", number: "" });

    useEffect(() => {
        if (formData.formLength.start && apiData.selectedCar) {
            const tank = formData.isFullTank.value ? 100 : apiData.selectedCar.tank;
            const date = stringToLocale(formData.formLength.start);
            const number = convertCarNumber(apiData.selectedCar.number);

            setOrderData({ tank, date, number });
        }
    }, [formData.formLength.start && apiData.selectedCar]);

    useEffect(() => {
        if (apiData.order.status === "idle") {
            dispatch(fetchStatuses());
        }
    }, [apiData.order.status]);

    useEffect(() => {
        dispatch(resetFilteredCars());
    }, []);

    return (
        <form className={styles.totalForm}>
            <div className={styles.totalContainer}>
                <div className={styles.textContainer}>
                    <h2 className={styles.catTitle}>{apiData.selectedCar.name}</h2>
                    <div className={styles.cardNumber}>{orderData.number}</div>
                    <p className={styles.cardTextBold}>
                        Топливо
                        <span className={styles.cardText}>
                            {orderData.tank ? ` ${orderData.tank}%` : ` нет данных`}
                        </span>
                    </p>
                    <p className={styles.cardTextBold}>
                        Доступна с <span className={styles.cardText}>{orderData.date}</span>
                    </p>
                </div>
                <div className={styles.cardImageContainer}>
                    <img
                        className={styles.cardImage}
                        src={
                            // eslint-disable-next-line no-nested-ternary
                            apiData.selectedCar
                                ? apiData.selectedCar.thumbnail.path.includes("files")
                                    ? imageUrl + apiData.selectedCar.thumbnail.path
                                    : apiData.selectedCar.thumbnail.path
                                : ""
                        }
                    />
                </div>
            </div>
        </form>
    );
};

export default TotalStep;
