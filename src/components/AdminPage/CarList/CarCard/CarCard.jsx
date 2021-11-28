import React from "react";
import classNames from "classnames";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { imageUrl } from "../../../../constants/constants";
import Checkbox from "../../../Common/UI/Checkbox/Checkbox.jsx";
import Button from "../../../Common/UI/Button.jsx";
// import ButtonBar from "./ButtonBar/ButtonBar.jsx";
import useDateFormat from "../../../../hooks/useDateFormat";
import useNumberFormat from "../../../../hooks/useNumberFormat";
import editButton from "../../../../images/admin/editIcon.svg";
import styles from "./CarCard.module.scss";

const CarCard = ({ car, onClick, token, statuses }) => {
    const dispatch = useDispatch();
    const { push } = useHistory();
    const [convertNumber, convertCarNumber] = useNumberFormat();

    const [convertDateToSeconds, secondsToDhms, secondsToMinutes, secondsToHours, stringToLocale, secondsToDays] =
        useDateFormat();

    const handleOpenCard = () => {
        onClick(car);
    };

    const handleChange = () => {
        push(`/admin/carlist/${car.id}`);
        // if (isCardOpened) {
        //     openCard();
        // }
    };

    return (
        <div className={styles.order} onClick={handleOpenCard}>
            {/* <div className={styles.orderTitle}>
                <p className={styles.orderText}>
                    Модель <span className={styles.orderTextBold}>{car.name}</span>
                </p>
                <p className={styles.orderText}>
                    Статус:{" "}
                    <span className={styles.orderTextBold}>
                        {order.orderStatusId ? order.orderStatusId.name : "нет данных"}
                    </span>
                </p>
            </div> */}
            <div className={styles.orderContainer}>
                <div className={styles.orderImageBlock}>
                    <img
                        className={styles.cardImage}
                        src={
                            // eslint-disable-next-line no-nested-ternary
                            car.thumbnail
                                ? car.thumbnail.path.includes("files")
                                    ? imageUrl + car.thumbnail.path
                                    : car.thumbnail.path
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
                                car.name ? car.name : "нет данных"
                            }
                        </span>
                    </div>
                    <div className={styles.orderTextBlock}>
                        <p className={styles.orderText}>Цена от:</p>
                        <span className={styles.orderTextBold}>
                            {car.priceMin ? `${convertNumber(car.priceMin)} ₽` : "нет данных"}
                        </span>
                    </div>
                    <div className={styles.orderTextBlock}>
                        <p className={styles.orderText}>Цена до:</p>
                        <span className={styles.orderTextBold}>
                            {car.priceMax ? `${convertNumber(car.priceMin)} ₽` : "нет данных"}
                        </span>
                    </div>
                </div>
                <div className={styles.orderExtraBlock}>
                    <div className={styles.orderTextBlock}>
                        <p className={styles.orderText}>Топливо:</p>
                        <span className={styles.orderTextBold}>{car.tank ? `${car.tank} %` : "нет данных"}</span>
                    </div>
                    <div className={styles.orderTextBlock}>
                        <p className={styles.orderText}>Номер:</p>
                        <span className={styles.orderTextBold}>{car.number ? car.number : "нет данных"}</span>
                    </div>
                    <div className={styles.orderTextBlock}>
                        <p className={styles.orderText}>Категория: </p>{" "}
                        <span className={styles.orderTextBold}>
                            {car.categoryId ? car.categoryId.name : "нет данных"}
                        </span>
                    </div>
                </div>
                {/* <div className={styles.orderTextBlock}>
                    <div className={styles.orderTextBlock}>
                        <p className={styles.orderText}>Цвета:</p>
                        <div className={styles.colorBox}>
                            {car.colors.length > 0 ? (
                                car.colors.map((color, index) => (
                                    <span key={index} className={styles.orderTextBold}>
                                        {color}
                                    </span>
                                ))
                            ) : (
                                <span className={styles.orderTextBold}>нет данных</span>
                            )}
                        </div>
                    </div>
                </div> */}
                <div className={styles.orderDescriptionBlock}>
                    <div className={styles.orderTextBlock}>
                        <p className={styles.orderText}>Описание:</p>
                        <span className={styles.orderTextBoldDescription}>
                            {car.description ? car.description : "нет данных"}
                        </span>
                    </div>
                </div>
                <Button className={styles.orderButtonDesk} onClick={handleChange}>
                    <img src={editButton} className={styles.orderButtonImage} />
                    <p className={styles.orderButtonText}>Изменить</p>
                </Button>
                {/* <ButtonBar order={order} token={token} className={styles.buttonContainer} /> */}
            </div>
        </div>
    );
};
export default CarCard;
