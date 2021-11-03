import React from "react";
import classNames from "classnames";
import useNumberFormat from "../../../../hooks/useNumberFormat";
import { imageUrl } from "../../../../constants/constants";
import styles from "./ModelCard.module.scss";

const ModelCard = ({ car, onClick, pickedCar }) => {
    const [convertNumber, convertCarNumber] = useNumberFormat();

    const conteinerClassName = classNames({
        [`${styles.cardContainer}`]: true,
        [`${styles.cardContainerActive}`]: pickedCar.car.id === car.id,
    });

    return (
        <div onClick={onClick} className={conteinerClassName}>
            <div className={styles.textContainer}>
                <div className={styles.cardModelText}>
                    {car.name.includes(",") ? car.name.split(" ").slice(1).join(" ") : car.name}
                </div>
                <div className={styles.cardPriceText}>{`${convertNumber(car.priceMin)} - ${convertNumber(
                    car.priceMax,
                )} ₽`}</div>
            </div>
            <div className={styles.cardImageContainer}>
                <img
                    className={styles.cardImage}
                    src={car.thumbnail.path.includes("files") ? imageUrl + car.thumbnail.path : car.thumbnail.path}
                />
            </div>
        </div>
    );
};
export default ModelCard;
