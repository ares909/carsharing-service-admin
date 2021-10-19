import React from "react";
import classNames from "classnames";
import styles from "./Checkbox.module.scss";

const Checkbox = (props) => {
    const { name, value, children, toggle, checked, onChange, ...rest } = props;
    const handleChange = (e) => {
        props.onChange(e.target.value);
    };
    return (
        <div className={styles.radioContainer}>
            <label className={styles.label}>
                <input
                    className={styles.input}
                    checked={props.checked === props.value}
                    value={props.value}
                    type="radio"
                    onChange={handleChange}
                    {...rest}
                    name={name}
                ></input>

                <span htmlFor={name} className={styles.point}>
                    {props.name}
                </span>
            </label>
        </div>
    );
};

export default Checkbox;
