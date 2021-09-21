import React from "react";
import styles from "../Slider.module.scss";

const SliderContent = ({ translate, transition, width, children }) => (
    <div
        className={styles.content}
        style={{
            transform: `translateX(-${translate}px)`,
            transition: `transform ease-out ${transition}s`,
            width: `${width}px`,
        }}
    >
        {children}
    </div>
);

export default SliderContent;
