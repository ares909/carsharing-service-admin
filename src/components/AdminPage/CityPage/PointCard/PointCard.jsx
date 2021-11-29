import React from "react";
import classNames from "classnames";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import Button from "../../../Common/UI/Button.jsx";
// import ButtonBar from "./ButtonBar/ButtonBar.jsx";
import { removePoint } from "../../../../store/slices/apiSlice";
import useDateFormat from "../../../../hooks/useDateFormat";
import useNumberFormat from "../../../../hooks/useNumberFormat";
import cancelButton from "../../../../images/admin/cancelButton.svg";
import styles from "./PointCard.module.scss";

const PointCard = ({ point, onClick }) => {
    const dispatch = useDispatch();
    const handleOpenCard = () => {
        onClick(point);
    };
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
            </div>
        </div>
    );
};
export default PointCard;
