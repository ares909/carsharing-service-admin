import React from "react";
import { useDispatch } from "react-redux";
import Button from "../../../Common/UI/Button.jsx";
import CityBlock from "../../CarList/CarCard/CarBlock/CarBlock.jsx";
import { pointBlockArray } from "../../../../constants/cityConstants";
import { removePoint } from "../../../../store/actions/apiActions";
import cancelButton from "../../../../images/admin/cancelButton.svg";
import styles from "./PointCard.module.scss";

const PointCard = ({ point, onClick, token }) => {
    const dispatch = useDispatch();
    const handleOpenCard = () => {
        onClick(point);
    };
    const handleDelete = () => {
        dispatch(removePoint({ pointId: point.id, token }));
    };

    return (
        <div className={styles.order} onClick={handleOpenCard}>
            <div className={styles.orderContainer}>
                <CityBlock
                    type="text"
                    className={styles.orderCarBlock}
                    textClassName={styles.orderTextBlock}
                    data={pointBlockArray(point)}
                />

                <Button className={styles.orderButtonDesk} onClick={handleDelete}>
                    <img src={cancelButton} className={styles.orderButtonImage} />
                    <p className={styles.orderButtonText}>Удалить</p>
                </Button>
            </div>
        </div>
    );
};
export default PointCard;
