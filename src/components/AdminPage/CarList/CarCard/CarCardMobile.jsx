import React from "react";
import { useHistory } from "react-router";
import classNames from "classnames";
import crossButtonBlack from "../../../Common/UI/CrossButton/CrossButtonBlack.jsx";
import Button from "../../../Common/UI/Button.jsx";
import useNumberFormat from "../../../../hooks/useNumberFormat";
import { imageUrl } from "../../../../constants/constants";
import useDateFormat from "../../../../hooks/useDateFormat";
import editButton from "../../../../images/admin/editIcon.svg";
import styles from "./CarCard.module.scss";

const OrderCardMobile = ({ car, isCardOpened, openCard }) => {
    const [convertNumber, convertCarNumber] = useNumberFormat();
    const [convertDateToSeconds, secondsToDhms, secondsToMinutes, secondsToHours, stringToLocale, secondsToDays] =
        useDateFormat();
    const { push } = useHistory();
    const orderClassName = classNames({
        [`${styles.orderMobile}`]: true,
        [`${styles.orderDisabled}`]: !isCardOpened,
    });

    const handleChange = () => {
        push(`/admin/carlist/${car.id}`);
        if (isCardOpened) {
            openCard();
        }
    };

    return car ? (
        <div className={orderClassName}>
            <div className={styles.orderContainerMobile}>
                <div className={styles.orderImageBlockMobile}>
                    <img
                        className={styles.cardImageMobile}
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
                <div className={styles.carMobileInfo}>
                    <div className={styles.orderBlockMobile}>
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
                    <div className={styles.orderBlockMobile}>
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
                </div>

                <Button className={styles.buttonMobile} onClick={handleChange}>
                    <img src={editButton} className={styles.orderButtonImage} />
                    <p className={styles.orderButtonText}>Изменить</p>
                </Button>
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
