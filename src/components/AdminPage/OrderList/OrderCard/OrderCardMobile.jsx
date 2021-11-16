import React from "react";
import classNames from "classnames";
import useNumberFormat from "../../../../hooks/useNumberFormat";
import { imageUrl } from "../../../../constants/constants";
import Checkbox from "../../../Common/UI/Checkbox/Checkbox.jsx";
import styles from "./OrderCard.module.scss";
import crossButtonBlack from "../../../Common/UI/CrossButton/CrossButtonBlack.jsx";
import useDateFormat from "../../../../hooks/useDateFormat";
import Button from "../../../Common/UI/Button.jsx";

const OrderCardMobile = ({ order, onClick, isCardOpened, openCard }) => {
    const [convertNumber, convertCarNumber] = useNumberFormat();
    const [convertDateToSeconds, secondsToDhms, secondsToMinutes, secondsToHours, stringToLocale, secondsToDays] =
        useDateFormat();

    const orderClassName = classNames({
        [`${styles.orderMobile}`]: true,
        [`${styles.orderDisabled}`]: !isCardOpened,
    });

    return order ? (
        <div className={orderClassName}>
            <div className={styles.orderTitleMobile}>
                <p className={styles.orderText}>
                    Заказ № <span className={styles.orderTextBoldMobile}>{order.id}</span>
                </p>
                <p className={styles.orderText}>
                    Статус:{" "}
                    <span className={styles.orderTextBoldMobile}>
                        {order.orderStatusId ? order.orderStatusId.name : "нет данных"}
                    </span>
                </p>
            </div>
            <div className={styles.orderContainerMobile}>
                <div className={styles.orderBlockMobile}>
                    <img
                        className={styles.cardImageMobile}
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
                <div className={styles.orderBlockMobile}>
                    <div className={styles.orderTextBlock}>
                        <p className={styles.orderText}>Модель:</p>
                        <span className={styles.orderTextBoldMobile}>
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
                        <span className={styles.orderTextBoldMobile}>
                            {order.cityId ? order.cityId.name : "нет данных"}
                        </span>
                    </div>
                    <div className={styles.orderTextBlock}>
                        <p className={styles.orderText}>Адрес:</p>
                        <span className={styles.orderTextBoldMobile}>
                            {order.pointId ? order.pointId.address : "нет данных"}
                        </span>
                    </div>
                </div>
                <div className={styles.orderBlockMobile}>
                    <div className={styles.orderTextBlock}>
                        <p className={styles.orderText}>Срок:</p>
                        <span className={styles.orderTextBoldMobile}>
                            {order.dateFrom && order.dateTo
                                ? secondsToDhms(order.dateTo - order.dateFrom)
                                : "нет данных"}
                        </span>
                    </div>
                    <div className={styles.orderTextBlock}>
                        <p className={styles.orderText}>Тариф:</p>
                        <span className={styles.orderTextBoldMobile}>
                            {order.rateId ? order.rateId.rateTypeId.name : "нет данных"}
                        </span>
                    </div>
                    <div className={styles.orderTextBlock}>
                        <p className={styles.orderText}>Цена: </p>{" "}
                        <span className={styles.orderTextBoldMobile}>
                            {order.price ? `${convertNumber(order.price)} ₽` : "нет данных"}
                        </span>
                    </div>
                </div>

                <div className={styles.orderBlockMobile}>
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
            </div>
            <Button type="button" onClick={openCard} className={styles.crossButton}>
                {crossButtonBlack}
            </Button>
        </div>
    ) : (
        <></>
    );
};
export default OrderCardMobile;
