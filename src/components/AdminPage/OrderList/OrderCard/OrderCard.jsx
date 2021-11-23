import React from "react";
import classNames from "classnames";

import { useDispatch, useSelector } from "react-redux";
import { imageUrl } from "../../../../constants/constants";
import Checkbox from "../../../Common/UI/Checkbox/Checkbox.jsx";
import ButtonBar from "./ButtonBar/ButtonBar.jsx";
import useDateFormat from "../../../../hooks/useDateFormat";
import useNumberFormat from "../../../../hooks/useNumberFormat";
import styles from "./OrderCard.module.scss";

const OrderCard = ({ order, onClick, token }) => {
    const dispatch = useDispatch();
    const [convertNumber, convertCarNumber] = useNumberFormat();

    const [convertDateToSeconds, secondsToDhms, secondsToMinutes, secondsToHours, stringToLocale, secondsToDays] =
        useDateFormat();
    const handleOpenCard = () => {
        onClick(order);
    };

    return (
        <div className={styles.order} onClick={handleOpenCard}>
            <div className={styles.orderTitle}>
                <p className={styles.orderText}>
                    Заказ № <span className={styles.orderTextBold}>{order.id}</span>
                </p>
                <p className={styles.orderText}>
                    Статус:{" "}
                    <span className={styles.orderTextBold}>
                        {order.orderStatusId ? order.orderStatusId.name : "нет данных"}
                    </span>
                </p>
            </div>
            <div className={styles.orderContainer}>
                <div className={styles.orderImageBlock}>
                    <img
                        className={styles.cardImage}
                        src={
                            // eslint-disable-next-line no-nested-ternary
                            order.carId
                                ? order.carId.thumbnail.path.includes("files")
                                    ? imageUrl + order.carId.thumbnail.path
                                    : order.carId.thumbnail.path
                                : ""
                        }
                        alt="нет фото"
                    />
                </div>
                <div className={styles.orderCarBlock}>
                    <div className={styles.orderTextBlock}>
                        <p className={styles.orderText}>Модель:</p>
                        <span className={styles.orderTextBold}>
                            {
                                // eslint-disable-next-line no-nested-ternary
                                order.carId
                                    ? order.carId.name.includes(",")
                                        ? order.carId.name.split(" ").slice(1).join(" ")
                                        : order.carId.name
                                    : "нет данных"
                            }
                        </span>
                    </div>
                    <div className={styles.orderTextBlock}>
                        <p className={styles.orderText}>Город:</p>
                        <span className={styles.orderTextBold}>{order.cityId ? order.cityId.name : "нет данных"}</span>
                    </div>
                    <div className={styles.orderTextBlock}>
                        <p className={styles.orderText}>Адрес:</p>
                        <span className={styles.orderTextBold}>
                            {order.pointId ? order.pointId.address : "нет данных"}
                        </span>
                    </div>
                </div>
                <div className={styles.orderExtraBlock}>
                    <div className={styles.orderTextBlock}>
                        <p className={styles.orderText}>Срок:</p>
                        <span className={styles.orderTextBold}>
                            {order.dateFrom && order.dateTo
                                ? secondsToDhms(order.dateTo - order.dateFrom)
                                : "нет данных"}
                        </span>
                    </div>
                    <div className={styles.orderTextBlock}>
                        <p className={styles.orderText}>Тариф:</p>
                        <span className={styles.orderTextBold}>
                            {order.rateId ? order.rateId.rateTypeId.name : "нет данных"}
                        </span>
                    </div>
                    <div className={styles.orderTextBlock}>
                        <p className={styles.orderText}>Цена: </p>{" "}
                        <span className={styles.orderTextBold}>
                            {order.price ? `${convertNumber(order.price)} ₽` : "нет данных"}
                        </span>
                    </div>
                </div>

                <div className={styles.orderCheckBoxBlock}>
                    <Checkbox
                        value={order.isFullTank}
                        name={`Полный бак`}
                        checked={order.isFullTank === true}
                        onChange={() => {}}
                    />
                    <Checkbox
                        value={order.isNeedChildChair}
                        name={`Детское кресло`}
                        checked={order.isNeedChildChair === true}
                        onChange={() => {}}
                    />
                    <Checkbox
                        value={order.isRightWheel}
                        name={`Правый руль`}
                        checked={order.isRightWheel === true}
                        onChange={() => {}}
                    />
                </div>
                <ButtonBar order={order} token={token} />
            </div>
        </div>
    );
};
export default OrderCard;
