import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import Button from "../../../Common/UI/Button.jsx";
import { resetAuthState } from "../../../../store/slices/authSlice";
import styles from "./CarFileInput.module.scss";

const CarFileInput = ({ id, name, label, placeholder, register, errors, isValid, type, onFocus, ...rest }) => {
    const { ref, ...inputProps } = register(name);
    const dispatch = useDispatch();

    const inputClassName = classNames({
        [`${styles.input}`]: true,
        [`${styles.inputError}`]: errors[name],
    });

    const handleClick = (e) => {
        e.preventDefault();
        document.getElementById(id).click();
    };
    return (
        <div className={styles.inputContainer}>
            <label className={styles.inputLabel} htmlFor={name}>
                {label}
            </label>
            <input
                id={id}
                className={inputClassName}
                name={name}
                placeholder={placeholder}
                ref={ref}
                autoComplete="off"
                type={type}
                {...inputProps}
                onFocus={onFocus}
                // onChange={onChange}
            />
            <Button onClick={handleClick} type="button" name="Обзор" className={styles.button} />
            {errors[name] && <span className={styles.inputErrorMessage}>{errors[name].message}</span>}
        </div>
    );
};
export default CarFileInput;
