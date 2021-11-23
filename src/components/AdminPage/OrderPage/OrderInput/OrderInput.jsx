import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import Select, { createFilter } from "react-select";
import { apiData } from "../../../../store/selectors/selectors";
import { resetAuthState } from "../../../../store/slices/authSlice";
import { fetchPoints, apiAction } from "../../../../store/slices/apiSlice";
import styles from "./OrderInput.module.scss";
import useDateFormat from "../../../../hooks/useDateFormat";

const OrderInput = ({
    name,
    label,
    field,
    placeholder,
    errors,
    isValid,
    type,
    options,
    valueState,
    reset,
    getValues,
    disabled,
    ...rest
}) => {
    const dispatch = useDispatch();
    const {
        statuses,
        singleOrder,
        status,
        cars,
        rates,
        cities,
        order,
        points,
        orderPrice,
        isFullTank,
        isNeedChildChair,
        isRightWheel,
    } = useSelector(apiData);
    const [convertDateToSeconds, secondsToDhms, secondsToMinutes, secondsToHours, stringToLocale, secondsToDays] =
        useDateFormat();

    useEffect(() => {
        if (name === "city" && field.value) {
            dispatch(fetchPoints(field.value.id));
            if (field.value.id && field.value.id !== (order.data.cityId ? order.data.cityId.id : ""))
                reset({ ...getValues(), address: "", car: "" });
        }
    }, [name, field.value]);

    useEffect(() => {
        if (name === "rate" && field.value) {
            const rateName = field.value.value;
            const hours = secondsToHours(order.data.dateTo - order.data.dateFrom);
            const minutes = secondsToMinutes(order.data.dateTo - order.data.dateFrom);
            const days = secondsToDays(order.data.dateTo - order.data.dateFrom);

            let price;
            let chargeDays;

            switch (rateName) {
                case "Поминутно":
                    price = field.value.price * minutes;
                    dispatch(apiAction({ orderPrice: price }));
                    break;

                case "Суточный":
                    chargeDays = Math.ceil(hours / 24);
                    price = field.value.price * chargeDays;
                    dispatch(apiAction({ orderPrice: price }));
                    break;

                case "Недельный (Акция!)":
                    chargeDays = Math.ceil(days / 7);
                    price = chargeDays === 1 ? field.value.price * 7 : field.value.price * 7 * chargeDays;
                    dispatch(apiAction({ orderPrice: price }));
                    break;

                case "Месячный":
                    chargeDays = Math.ceil(days / 30);
                    price = chargeDays === 1 ? field.value.price * 30 : field.value.price * 30 * chargeDays;
                    dispatch(apiAction({ orderPrice: price }));
                    break;
                default:
                    price = field.value.price * minutes;
                    dispatch(apiAction({ orderPrice: price }));
                    break;
            }
        }
    }, [name, field.value]);

    useEffect(() => {
        if (name === "isFullTank" && field.value) {
            if (field.value.value === true && isFullTank === false) {
                dispatch(apiAction({ orderPrice: orderPrice + field.value.price }));
                dispatch(apiAction({ isFullTank: true }));
            } else if (field.value.value === false && isFullTank === true) {
                dispatch(apiAction({ orderPrice: orderPrice + field.value.price }));
                dispatch(apiAction({ isFullTank: false }));
            }
        }
    }, [name, field.value, order.data.isFullTank]);

    useEffect(() => {
        if (name === "isNeedChildChair" && field.value) {
            if (field.value.value === true && isNeedChildChair === false) {
                dispatch(apiAction({ orderPrice: orderPrice + field.value.price }));
                dispatch(apiAction({ isNeedChildChair: true }));
            } else if (field.value.value === false && isNeedChildChair === true) {
                dispatch(apiAction({ orderPrice: orderPrice + field.value.price }));
                dispatch(apiAction({ isNeedChildChair: false }));
            }
        }
    }, [name, field.value]);

    useEffect(() => {
        if (name === "isRightWheel" && field.value) {
            if (field.value.value === true && isRightWheel === false) {
                dispatch(apiAction({ orderPrice: orderPrice + field.value.price }));
                dispatch(apiAction({ isRightWheel: true }));
            } else if (field.value.value === false && isRightWheel === true) {
                dispatch(apiAction({ orderPrice: orderPrice + field.value.price }));
                dispatch(apiAction({ isRightWheel: false }));
            }
        }
    }, [name, field.value]);

    // const { value, ...inputProps } = field;

    // const inputClassName = classNames({
    //     [`${styles.input}`]: true,
    //     [`${styles.inputError}`]: errors[name],
    // });

    const filterConfig = {
        ignoreCase: true,
        ignoreAccents: true,
        trim: true,
        matchFrom: "start",
    };

    return (
        <div className={styles.inputContainer}>
            <label className={styles.inputLabel} htmlFor={name}>
                {label}
            </label>
            <Select
                className={styles.input}
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
                // value={valueState ? options.filter((option) => option.value === valueState) : value || ""}
            />

            {errors[name] && <span className={styles.inputErrorMessage}>{errors[name].message}</span>}
        </div>
    );
};
export default OrderInput;
