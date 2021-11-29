import React from "react";
import { useDispatch } from "react-redux";
import classNames from "classnames";
import styles from "./CityInput.module.scss";

const CityInput = ({ name, placeholder, register, errors, isValid, type, onFocus, ...rest }) => {
    const { ref, ...inputProps } = register(name);

    const inputClassName = classNames({
        [`${styles.input}`]: true,
        [`${styles.inputError}`]: errors[name],
    });
    return (
        <div className={styles.inputContainer}>
            <input
                className={inputClassName}
                name={name}
                placeholder={placeholder}
                ref={ref}
                autoComplete="off"
                type={type}
                {...inputProps}
                onFocus={onFocus}
            />
            {errors[name] && <span className={styles.inputErrorMessage}>{errors[name].message}</span>}
        </div>
    );
};
export default CityInput;
