import React from "react";
import Button from "../../../Common/UI/Button.jsx";
import styles from "../Slider.module.scss";

const SliderCard = ({ content, width }) => (
    <div
        className={styles.card}
        style={{
            width: `${width}px`,
            backgroundImage: `url(${content.image})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
        }}
    >
        <div className={styles.cardContainer}>
            <h3 className={styles.cardTitle}>{content.title}</h3>
            <p className={styles.cardText}>{content.text}</p>
            <Button className={styles.cardButton} style={{ background: content.color }} name="Подробнее" />
        </div>
    </div>
);

export default SliderCard;
