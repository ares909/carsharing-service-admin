import React from "react";
import classNames from "classnames";
import styles from "./Checkbox.module.scss";

const Checkbox = (props) => {
    const { name, value, children, toggle, checked, onChange, ...rest } = props;
    const handleChange = () => {
        props.onChange();
    };
    return (
        <div className={styles.radioContainer}>
            <label className={styles.label}>
                <input
                    className={styles.input}
                    checked={props.checked}
                    value={props.value}
                    type="checkbox"
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
