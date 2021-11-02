import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { apiData, formData, validationState } from "../../../store/selectors/selectors";
import { resetFilteredCars, fetchStatuses } from "../../../store/slices/apiSlice";
import useNumberFormat from "../../../hooks/useNumberFormat";
import useDateFormat from "../../../hooks/useDateFormat";
import { imageUrl } from "../../../constants/constants";
import styles from "./TotalStep.module.scss";

const TotalStep = () => {
    const dispatch = useDispatch();
    const { push } = useHistory();
    const [convertNumber, convertCarNumber] = useNumberFormat();
    const [convertDateToSeconds, secondsToDhms, secondsToMinutes, secondsToHours, stringToLocale] = useDateFormat();
    const { selectedCar, order } = useSelector(apiData);
    const { formLength, isFullTank } = useSelector(formData);
    const { locationValid } = useSelector(validationState);
    const [orderData, setOrderData] = useState({ tank: "", date: "", number: "" });

    useEffect(() => {
        if (locationValid === false) {
            push("/order");
        }
    }, [locationValid]);

    useEffect(() => {
        if (formLength.start && selectedCar) {
            const tank = isFullTank.value ? 100 : selectedCar.tank;
            const date = stringToLocale(formLength.start);
            const number = convertCarNumber(selectedCar.number);

            setOrderData({ tank, date, number });
        }
    }, [formLength.start && selectedCar]);

    useEffect(() => {
        if (order.status === "idle") {
            dispatch(fetchStatuses());
        }
    }, [order.status]);

    useEffect(() => {
        dispatch(resetFilteredCars());
    }, []);

    return (
        <form className={styles.totalForm}>
            <div className={styles.totalContainer}>
                <div className={styles.textContainer}>
                    <h2 className={styles.catTitle}>{selectedCar.name}</h2>
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
                            selectedCar
                                ? selectedCar.thumbnail.path.includes("files")
                                    ? imageUrl + selectedCar.thumbnail.path
                                    : selectedCar.thumbnail.path
                                : ""
                        }
                    />
                </div>
            </div>
        </form>
    );
};

export default TotalStep;
