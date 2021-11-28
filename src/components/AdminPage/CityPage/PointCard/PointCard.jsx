import React, { useEffect } from "react";
import classNames from "classnames";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { imageUrl } from "../../../../constants/constants";
import Checkbox from "../../../Common/UI/Checkbox/Checkbox.jsx";
import Button from "../../../Common/UI/Button.jsx";
// import ButtonBar from "./ButtonBar/ButtonBar.jsx";
import { fetchPoints, removePoint } from "../../../../store/slices/apiSlice";
import useDateFormat from "../../../../hooks/useDateFormat";
import useNumberFormat from "../../../../hooks/useNumberFormat";
import cancelButton from "../../../../images/admin/cancelButton.svg";
import styles from "./PointCard.module.scss";

const PointCard = ({ point, onClick, token, statuses, cityId }) => {
    const dispatch = useDispatch();
    const { push } = useHistory();
    const [convertNumber, convertCarNumber] = useNumberFormat();

    const [convertDateToSeconds, secondsToDhms, secondsToMinutes, secondsToHours, stringToLocale, secondsToDays] =
        useDateFormat();

    const handleOpenCard = () => {
        onClick(point);
    };

    // useEffect(() => {})

    const handleDelete = () => {
        dispatch(removePoint({ pointId: point.id }));
    };

    return (
        <div className={styles.order} onClick={handleOpenCard}>
            <div className={styles.orderContainer}>
                <div className={styles.orderCarBlock}>
                    <div className={styles.orderTextBlock}>
                        <p className={styles.orderText}>Адрес:</p>
                        <span className={styles.orderTextBold}>
                            {
                                // eslint-disable-next-line no-nested-ternary
                                point.address ? point.address : "нет данных"
                            }
                        </span>
                    </div>
                    <div className={styles.orderTextBlock}>
                        <p className={styles.orderText}>Ориентир:</p>
                        <span className={styles.orderTextBold}>
                            {
                                // eslint-disable-next-line no-nested-ternary
                                point.name ? point.name : "нет данных"
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
export default PointCard;
