import React from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import Select, { createFilter } from "react-select";
import { apiData } from "../../../../store/selectors/selectors";
import useDateFormat from "../../../../hooks/useDateFormat";
import styles from "./CarInputControlled.module.scss";

const CarInputControlled = ({
    name,
    label,
    field,
    placeholder,
    errors,
    isValid,
    type,
    options,
    value,
    onChange,
    reset,
    getValues,
    disabled,
    ...rest
}) => {
    const filterConfig = {
        ignoreCase: true,
        ignoreAccents: true,
        trim: true,
        matchFrom: "start",
    };

    const inputClassName = classNames({
        [`${styles.input}`]: true,
        [`${styles.inputError}`]: errors[name],
    });

    return (
        <div className={styles.inputContainer}>
            <label className={styles.inputLabel} htmlFor={name}>
                {label}
            </label>
            <Select
                className={inputClassName}
                classNamePrefix={styles.input}
                name={name}
                options={options}
                isSearchable={true}
                placeholder={placeholder}
                isClearable
                noOptionsMessage={() => "Не найдено"}
                filterOption={createFilter(filterConfig)}
                {...field}
                isDisabled={disabled}
            />

            {errors[name] && <span className={styles.inputErrorMessage}>{errors[name].message}</span>}
        </div>
    );
};
export default CarInputControlled;
