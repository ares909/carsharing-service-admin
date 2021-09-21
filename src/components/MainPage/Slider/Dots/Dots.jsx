import React from "react";
import classNames from "classnames";
import styles from "../Slider.module.scss";

const Dot = ({ active }) => {
    const className = classNames({
        [`${styles.dot}`]: true,
        [`${styles.dotActive}`]: active,
    });
    return <span className={className}></span>;
};

const Dots = ({ slides, activeSlide }) => {
    return (
        <div className={styles.dotsContainer}>
            {slides.map((slide, i) => (
                <Dot key={slide.title} active={activeSlide === i} />
            ))}
        </div>
    );
};

export default Dots;
