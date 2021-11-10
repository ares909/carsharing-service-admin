import React from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { resetAuthState } from "../../../../store/slices/authSlice";
import styles from "./Input.module.scss";

const Input = ({ name, label, placeholder, register, errors, isValid, ...rest }) => {
    const { ref, ...inputProps } = register(name);
    const dispatch = useDispatch();

    const inputClassName = classNames({
        [`${styles.input}`]: true,
        [`${styles.inputError}`]: errors[name],
    });
    return (
        <div className={styles.inputContainer}>
            <label className={styles.inputLabel} htmlFor={name}>
                {label}
            </label>
            <input
                className={inputClassName}
                name={name}
                placeholder={placeholder}
                ref={ref}
                autoComplete="off"
                {...inputProps}
                onFocus={(e) => dispatch(resetAuthState())}
            />
            {errors[name] && <span className={styles.inputErrorMessage}>{errors[name].message}</span>}
        </div>
    );
};
export default Input;
