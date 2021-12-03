import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Button from "../../../Common/UI/Button.jsx";
import RateBlock from "../../CarList/CarCard/CarBlock/CarBlock.jsx";
import { removeRate } from "../../../../store/actions/apiActions";
import cancelButton from "../../../../images/admin/cancelButton.svg";
import styles from "./RateCard.module.scss";
import { ratesBlockArray } from "../../../../constants/rateConstants";

const RateCard = ({ rate, onClick }) => {
    const dispatch = useDispatch();

    const handleOpenCard = () => {
        onClick(rate);
    };

    const handleDelete = () => {
        dispatch(removeRate({ rateId: rate.id }));
    };

    return (
        <div className={styles.order} onClick={handleOpenCard}>
            <div className={styles.orderContainer}>
                <RateBlock
                    type="text"
                    className={styles.orderCarBlock}
                    textClassName={styles.orderTextBlock}
                    data={ratesBlockArray(rate)}
                />

                <Button className={styles.orderButtonDesk} onClick={handleDelete}>
                    <img src={cancelButton} className={styles.orderButtonImage} />
                    <p className={styles.orderButtonText}>Удалить</p>
                </Button>
            </div>
        </div>
    );
};
export default RateCard;
