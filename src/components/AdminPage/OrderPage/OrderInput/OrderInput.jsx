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
    const { order, orderPrice, isFullTank, isNeedChildChair, isRightWheel } = useSelector(apiData);
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
        if (name === "rate" && field.value && order.data.price) {
            const rateName = field.value.value;
            const hours = secondsToHours(order.data.dateTo - order.data.dateFrom);
            const minutes = secondsToMinutes(order.data.dateTo - order.data.dateFrom);
            const days = secondsToDays(order.data.dateTo - order.data.dateFrom);

            let price;
            let chargeDays;

            switch (rateName) {
                case "Поминутно":
                    price = field.value.price * minutes;
                    dispatch(
                        apiAction({
                            orderPrice: price + isRightWheel.price + isFullTank.price + isNeedChildChair.price,
                        }),
                    );
                    break;

                case "Суточный":
                    chargeDays = Math.ceil(hours / 24);
                    price = field.value.price * chargeDays;
                    dispatch(
                        apiAction({
                            orderPrice: price + isRightWheel.price + isFullTank.price + isNeedChildChair.price,
                        }),
                    );
                    break;

                case "Недельный (Акция!)":
                    chargeDays = Math.ceil(days / 7);
                    price = chargeDays === 1 ? field.value.price * 7 : field.value.price * 7 * chargeDays;
                    dispatch(
                        apiAction({
                            orderPrice: price + isRightWheel.price + isFullTank.price + isNeedChildChair.price,
                        }),
                    );
                    break;

                case "Месячный":
                    chargeDays = Math.ceil(days / 30);
                    price = chargeDays === 1 ? field.value.price * 30 : field.value.price * 30 * chargeDays;
                    dispatch(
                        apiAction({
                            orderPrice: price + isRightWheel.price + isFullTank.price + isNeedChildChair.price,
                        }),
                    );
                    break;
                default:
                    price = order.data.price;
                    dispatch(apiAction({ orderPrice: price }));
                    break;
            }
        }
    }, [name, field.value, order.data.price, isFullTank.price, isNeedChildChair.price, isRightWheel.price]);

    useEffect(() => {
        if (name === "isFullTank" && field.value) {
            if (field.value.value === true && isFullTank.value === false) {
                dispatch(apiAction({ orderPrice: orderPrice + field.value.price }));
                dispatch(apiAction({ isFullTank: { value: true, price: field.value.price } }));
            } else if (field.value.value === false && isFullTank.value === true) {
                dispatch(apiAction({ orderPrice: orderPrice - field.value.price }));
                dispatch(apiAction({ isFullTank: { value: false, price: 0 } }));
            }
        }
    }, [name, field.value, isFullTank.value, isFullTank.price]);

    useEffect(() => {
        if (name === "isNeedChildChair" && field.value) {
            if (field.value.value === true && isNeedChildChair.value === false) {
                dispatch(apiAction({ orderPrice: orderPrice + field.value.price }));
                dispatch(apiAction({ isNeedChildChair: { value: true, price: field.value.price } }));
            } else if (field.value.value === false && isNeedChildChair.value === true) {
                dispatch(apiAction({ orderPrice: orderPrice - field.value.price }));
                dispatch(apiAction({ isNeedChildChair: { value: false, price: 0 } }));
            }
        }
    }, [name, field.value, isNeedChildChair.value, isNeedChildChair.price]);

    useEffect(() => {
        if (name === "isRightWheel" && field.value && order.data) {
            if (field.value.value === true && isRightWheel.value === false) {
                dispatch(apiAction({ orderPrice: orderPrice + field.value.price }));
                dispatch(apiAction({ isRightWheel: { value: true, price: field.value.price } }));
            } else if (field.value.value === false && isRightWheel.value === true) {
                dispatch(apiAction({ orderPrice: orderPrice - field.value.price }));
                dispatch(apiAction({ isRightWheel: { value: false, price: 0 } }));
            }
        }
    }, [name, field.value, isRightWheel.value, isRightWheel.price]);

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
export default OrderInput;
