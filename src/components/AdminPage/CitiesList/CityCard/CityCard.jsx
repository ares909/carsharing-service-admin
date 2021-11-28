import React, { useEffect } from "react";
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
import styles from "./CityCard.module.scss";

const CityCard = ({ city, onClick, token, statuses }) => {
    const dispatch = useDispatch();
    const { push } = useHistory();
    const [convertNumber, convertCarNumber] = useNumberFormat();

    const [convertDateToSeconds, secondsToDhms, secondsToMinutes, secondsToHours, stringToLocale, secondsToDays] =
        useDateFormat();

    const handleOpenCard = () => {
        onClick(city);
    };

    // useEffect(() => {})

    const handleChange = () => {
        push(`/admin/citylist/${city.id}`);
        // if (isCardOpened) {
        //     openCard();
        // }
    };

    return (
        <div className={styles.order} onClick={handleOpenCard}>
            <div className={styles.orderContainer}>
                <div className={styles.orderCarBlock}>
                    <div className={styles.orderTextBlock}>
                        <p className={styles.orderText}>Город:</p>
                        <span className={styles.orderTextBold}>
                            {
                                // eslint-disable-next-line no-nested-ternary
                                city.name ? city.name : "нет данных"
                            }
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
export default CityCard;
