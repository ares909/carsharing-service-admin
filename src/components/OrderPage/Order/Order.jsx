import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Preloader from "../../Common/UI/Preloader/Preloader.jsx";
import { formAction } from "../../../store/slices/formSlice";
import { validityAction } from "../../../store/slices/validationSlice";
import { resetFilteredCars, fetchOrder, fetchStatuses } from "../../../store/slices/apiSlice";
import { imageUrl } from "../../../constants/constants";
import useNumberFormat from "../../../hooks/useNumberFormat";
import useDateFormat from "../../../hooks/useDateFormat";
import styles from "./Order.module.scss";

const Order = () => {
    const dispatch = useDispatch();
    const [convertNumber, convertCarNumber] = useNumberFormat();
    const [convertDateToSeconds, secondsToDhms, secondsToMinutes, secondsToHours, stringToLocale] = useDateFormat();
    const { orderId } = useParams();
    const apiData = useSelector((state) => state.api);

    useEffect(() => {
        if (apiData.order.status === "idle") {
            dispatch(fetchOrder(orderId));
            dispatch(formAction({ queryParam: orderId }));
        }
    }, [apiData.order.status]);

    useEffect(() => {
        if (apiData.order.data.carId) {
            dispatch(validityAction({ totalValid: true }));
        } else {
            dispatch(validityAction({ totalValid: false }));
        }
    }, [apiData.order.data.carId]);

    useEffect(() => {
        if (apiData.order.status === "idle") {
            dispatch(fetchStatuses());
        }
    }, [apiData.order.status]);

    const [orderData, setOrderData] = useState({ tank: "", date: "", number: "" });

    useEffect(() => {
        if (apiData.order.data.carId) {
            const tank = apiData.order.data.isFullTank ? 100 : apiData.order.data.carId.tank;
            const date = stringToLocale(new Date(apiData.order.data.dateFrom));
            const number = convertCarNumber(apiData.order.data.carId.number);

            setOrderData({ tank, date, number });
        }
    }, [apiData.order.data.carId]);

    useEffect(() => {
        dispatch(resetFilteredCars());
    }, []);

    return (
        <form className={styles.totalForm}>
            {apiData.order.status === "succeeded" ? (
                <div className={styles.totalContainer}>
                    <div className={styles.textContainer}>
                        <h1 className={styles.orderTitle}>Ваш заказ подтверждён</h1>
                        <h2 className={styles.catTitle}>{apiData.order.data.carId.name}</h2>
                        <div className={styles.cardNumber}>{orderData.number}</div>
                        <p className={styles.cardTextBold}>
                            Топливо{" "}
                            <span className={styles.cardText}>
                                {orderData.tank ? `${orderData.tank}%` : `нет данных`}
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
                                apiData.order.data.carId.thumbnail.path.includes("files")
                                    ? imageUrl + apiData.order.data.carId.thumbnail.path
                                    : apiData.order.data.carId.thumbnail.path
                            }
                        />
                    </div>
                </div>
            ) : (
                <Preloader />
            )}
        </form>
    );
};

export default Order;
