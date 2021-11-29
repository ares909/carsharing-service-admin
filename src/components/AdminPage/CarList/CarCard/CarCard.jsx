import React from "react";
import classNames from "classnames";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { imageUrl } from "../../../../constants/constants";
import Button from "../../../Common/UI/Button.jsx";
import useDateFormat from "../../../../hooks/useDateFormat";
import useNumberFormat from "../../../../hooks/useNumberFormat";
import editButton from "../../../../images/admin/editIcon.svg";
import styles from "./CarCard.module.scss";

const CarCard = ({ car, onClick }) => {
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
    };

    return (
        <div className={styles.order} onClick={handleOpenCard}>
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
                            {car.priceMax ? `${convertNumber(car.priceMax)} ₽` : "нет данных"}
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
            </div>
        </div>
    );
};
export default CarCard;
