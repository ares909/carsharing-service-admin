import React from "react";
import classNames from "classnames";
import letftArrow from "../../../../images/slider/left-arrow.svg";
import rightArrow from "../../../../images/slider/right-arrow.svg";
import styles from "../Slider.module.scss";

const Arrow = (props) => {
    const { position, ...rest } = props;
    const className = classNames({
        [`${styles.arrow}`]: true,
        [`${styles.arrowLeft}`]: position === "left",
        [`${styles.arrowRight}`]: position !== "left",
    });
    return (
        <button className={className} {...rest}>
            <img className={styles.arrowImage} src={position === "left" ? letftArrow : rightArrow} alt="стрелка" />
        </button>
    );
};

export default Arrow;
