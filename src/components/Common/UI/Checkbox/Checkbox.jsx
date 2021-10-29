import React from "react";
import classNames from "classnames";
import styles from "./Checkbox.module.scss";

const Checkbox = ({ name, value, checked, onChange }) => {
    return (
        <div className={styles.radioContainer}>
            <label className={styles.label}>
                <input
                    className={styles.input}
                    checked={checked}
                    value={value}
                    type="checkbox"
                    onChange={onChange}
                    name={name}
                ></input>

                <span htmlFor={name} className={styles.point}>
                    {name}
                </span>
            </label>
        </div>
    );
};

export default Checkbox;
