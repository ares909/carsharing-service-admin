import React from "react";
import classNames from "classnames";
import styles from "./Radio.module.scss";

const Radio = ({ name, value, checked, onChange, item }) => {
    return (
        <div className={styles.radioContainer}>
            <label className={styles.label}>
                <input
                    className={styles.input}
                    checked={checked === value}
                    value={value}
                    type="radio"
                    onChange={() => onChange(item)}
                    name={name}
                ></input>

                <span htmlFor={name} className={styles.point}>
                    {name}
                </span>
            </label>
        </div>
    );
};

export default Radio;
