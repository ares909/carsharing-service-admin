import React, { useEffect } from "react";
import classNames from "classnames";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { imageUrl } from "../../../../constants/constants";
import Checkbox from "../../../Common/UI/Checkbox/Checkbox.jsx";
import Button from "../../../Common/UI/Button.jsx";
// import ButtonBar from "./ButtonBar/ButtonBar.jsx";
import { fetchPoints, removePoint, removeRate } from "../../../../store/slices/apiSlice";
import useDateFormat from "../../../../hooks/useDateFormat";
import useNumberFormat from "../../../../hooks/useNumberFormat";
import cancelButton from "../../../../images/admin/cancelButton.svg";
import styles from "./RateCard.module.scss";

const RateCard = ({ rate, onClick, token, statuses, cityId }) => {
    const dispatch = useDispatch();
    const { push } = useHistory();
    const [convertNumber, convertCarNumber] = useNumberFormat();

    const [convertDateToSeconds, secondsToDhms, secondsToMinutes, secondsToHours, stringToLocale, secondsToDays] =
        useDateFormat();

    const handleOpenCard = () => {
        onClick(rate);
    };

    // useEffect(() => {})

    const handleDelete = () => {
        dispatch(removeRate({ rateId: rate.id }));
    };

    return (
        <div className={styles.order} onClick={handleOpenCard}>
            <div className={styles.orderContainer}>
                <div className={styles.orderCarBlock}>
                    <div className={styles.orderTextBlock}>
                        <p className={styles.orderText}>Тариф:</p>
                        <span className={styles.orderTextBold}>
                            {
                                // eslint-disable-next-line no-nested-ternary
                                rate.rateTypeId.name ? rate.rateTypeId.name : "нет данных"
                            }
                        </span>
                    </div>
                    <div className={styles.orderTextBlock}>
                        <p className={styles.orderText}>Единица:</p>
                        <span className={styles.orderTextBold}>
                            {
                                // eslint-disable-next-line no-nested-ternary
                                rate.rateTypeId.unit ? rate.rateTypeId.unit : "нет данных"
                            }
                        </span>
                    </div>
                    <div className={styles.orderTextBlock}>
                        <p className={styles.orderText}>Цена:</p>
                        <span className={styles.orderTextBold}>
                            {
                                // eslint-disable-next-line no-nested-ternary
                                rate.price ? `${convertNumber(rate.price)} ₽` : "нет данных"
                            }
                        </span>
                    </div>
                </div>

                <Button className={styles.orderButtonDesk} onClick={handleDelete}>
                    <img src={cancelButton} className={styles.orderButtonImage} />
                    <p className={styles.orderButtonText}>Удалить</p>
                </Button>
                {/* <ButtonBar order={order} token={token} className={styles.buttonContainer} /> */}
            </div>
        </div>
    );
};
export default RateCard;
