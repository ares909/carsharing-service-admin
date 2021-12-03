import React from "react";
import { useHistory } from "react-router";
import Button from "../../../Common/UI/Button.jsx";
import CarBlock from "./CarBlock/CarBlock.jsx";
import { imageUrl } from "../../../../constants/constants";
import { carFirstBlockArray, carSecondBlockArray, carThirdBlockArray } from "../../../../constants/carConstants";
import editButton from "../../../../images/admin/editIcon.svg";
import styles from "./CarCard.module.scss";

const CarCard = ({ car, onClick }) => {
    const { push } = useHistory();
    const handleOpenCard = () => {
        onClick(car);
    };
    const handleChange = () => {
        push(`/admin/carlist/${car.id}`);
    };

    return (
        <div className={styles.order} onClick={handleOpenCard}>
            <div className={styles.orderContainer}>
                <CarBlock
                    type="image"
                    className={styles.orderImageBlock}
                    imageClassName={styles.cardImage}
                    data={
                        // eslint-disable-next-line no-nested-ternary
                        car.thumbnail && car.thumbnail.path
                            ? car.thumbnail.path.includes("files")
                                ? imageUrl + car.thumbnail.path
                                : car.thumbnail.path
                            : ""
                    }
                />

                <CarBlock
                    type="text"
                    className={styles.orderCarBlock}
                    textClassName={styles.orderTextBlock}
                    data={carFirstBlockArray(car)}
                />
                <CarBlock
                    type="text"
                    className={styles.orderExtraBlock}
                    textClassName={styles.orderTextBlock}
                    data={carSecondBlockArray(car)}
                />
                <CarBlock
                    type="description"
                    className={styles.orderDescriptionBlock}
                    textClassName={styles.orderTextBlock}
                    descriptionClassName={styles.orderTextBoldDescription}
                    data={carThirdBlockArray(car)}
                />

                <Button className={styles.orderButtonDesk} onClick={handleChange}>
                    <img src={editButton} className={styles.orderButtonImage} />
                    <p className={styles.orderButtonText}>Изменить</p>
                </Button>
            </div>
        </div>
    );
};
export default CarCard;
