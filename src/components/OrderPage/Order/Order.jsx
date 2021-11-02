import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Preloader from "../../Common/UI/Preloader/Preloader.jsx";
import { apiData, formData } from "../../../store/selectors/selectors";
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
    const { order, status } = useSelector(apiData);

    useEffect(() => {
        if (order.status === "idle") {
            dispatch(fetchOrder(orderId));
            dispatch(formAction({ queryParam: orderId }));
        }
    }, [order.status]);

    useEffect(() => {
        if (order.data.carId) {
            dispatch(validityAction({ totalValid: true }));
        } else {
            dispatch(validityAction({ totalValid: false }));
        }
    }, [order.data.carId]);

    useEffect(() => {
        if (order.status === "idle") {
            dispatch(fetchStatuses());
        }
    }, [order.status]);

    const [orderData, setOrderData] = useState({ tank: "", date: "", number: "" });

    useEffect(() => {
        if (order.data.carId) {
            const tank = order.data.isFullTank ? 100 : order.data.carId.tank;
            const date = stringToLocale(new Date(order.data.dateFrom));
            const number = convertCarNumber(order.data.carId.number);

            setOrderData({ tank, date, number });
        }
    }, [order.data.carId]);

    useEffect(() => {
        dispatch(resetFilteredCars());
    }, []);

    return (
        <form className={styles.totalForm}>
            {order.status === "succeeded" && (
                <div className={styles.totalContainer}>
                    <div className={styles.textContainer}>
                        <h1 className={styles.orderTitle}>Ваш заказ подтверждён</h1>
                        <h2 className={styles.catTitle}>{order.data.carId.name}</h2>
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
                                order.data.carId.thumbnail.path.includes("files")
                                    ? imageUrl + order.data.carId.thumbnail.path
                                    : order.data.carId.thumbnail.path
                            }
                        />
                    </div>
                </div>
            )}{" "}
            {status === "rejected" && !order.data && <h1 className={styles.orderTitle}>Произошла ошибка на сервере</h1>}
            {order.status === "loading" && <Preloader />}
        </form>
    );
};

export default Order;
