import React from "react";
import { useLocation } from "react-router";
import classNames from "classnames";
import styles from "./Checkbox.module.scss";

const Checkbox = ({ name, value, checked, onChange }) => {
    const location = useLocation();

    const inputClassName = classNames({
        [`${styles.input}`]: true,
        [`${styles.carInput}`]: location.pathname.includes("carlist") || location.pathname.includes("carcard"),
    });

    const pointClassName = classNames({
        [`${styles.point}`]: true,
        [`${styles.carPoint}`]: location.pathname.includes("carlist") || location.pathname.includes("carcard"),
    });

    return (
        <div className={styles.radioContainer}>
            <label className={styles.label}>
                <input
                    className={inputClassName}
                    checked={checked}
                    value={value}
                    type="checkbox"
                    onChange={onChange}
                    name={name}
                ></input>

                <span htmlFor={name} className={pointClassName}>
                    {name}
                </span>
            </label>
        </div>
    );
};

export default Checkbox;
