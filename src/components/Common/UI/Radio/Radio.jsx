import React from "react";
import classNames from "classnames";
import styles from "./Radio.module.scss";

const Radio = (props) => {
    const { name, value, children, toggle, checked, onChange, item, ...rest } = props;
    const handleChange = (e) => {
        props.onChange(props.item);
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

export default Radio;
