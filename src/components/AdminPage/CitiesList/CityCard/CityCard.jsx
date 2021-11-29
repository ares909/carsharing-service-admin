import React from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import Button from "../../../Common/UI/Button.jsx";

import useDateFormat from "../../../../hooks/useDateFormat";
import useNumberFormat from "../../../../hooks/useNumberFormat";
import editButton from "../../../../images/admin/editIcon.svg";
import cancelButton from "../../../../images/admin/cancelButton.svg";
import styles from "./CityCard.module.scss";
import { removeCity } from "../../../../store/slices/apiSlice";

const CityCard = ({ city, onClick }) => {
    const dispatch = useDispatch();
    const { push } = useHistory();
    useDateFormat();

    const handleOpenCard = () => {
        onClick(city);
    };

    const handleChange = () => {
        push(`/admin/citylist/${city.id}`);
    };

    const handleDeleteCity = () => {
        dispatch(removeCity({ cityId: city.id }));
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
                <div className={styles.buttonContainer}>
                    <Button className={styles.orderButtonDesk} onClick={handleChange}>
                        <img src={editButton} className={styles.orderButtonImage} />
                        <p className={styles.orderButtonText}>Изменить</p>
                    </Button>
                    <Button className={styles.orderButtonDesk} onClick={handleDeleteCity}>
                        <img src={cancelButton} className={styles.orderButtonImage} />
                        <p className={styles.orderButtonText}>Удалить</p>
                    </Button>
                </div>
            </div>
        </div>
    );
};
export default CityCard;
