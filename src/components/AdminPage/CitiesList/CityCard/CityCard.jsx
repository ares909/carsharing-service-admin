import React from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import Button from "../../../Common/UI/Button.jsx";
import CityBlock from "../../CarList/CarCard/CarBlock/CarBlock.jsx";
import { cityBlockArray } from "../../../../constants/cityConstants";
import { removeCity } from "../../../../store/actions/apiActions";
import editButton from "../../../../images/admin/editIcon.svg";
import cancelButton from "../../../../images/admin/cancelButton.svg";
import styles from "./CityCard.module.scss";

const CityCard = ({ city, onClick }) => {
    const dispatch = useDispatch();
    const { push } = useHistory();

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
                <CityBlock
                    type="text"
                    className={styles.orderCarBlock}
                    textClassName={styles.orderTextBlock}
                    data={cityBlockArray(city)}
                />

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
