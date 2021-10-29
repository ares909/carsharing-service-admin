import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Radio from "../../Common/UI/Radio/Radio.jsx";
import Checkbox from "../../Common/UI/Checkbox/Checkbox.jsx";
import DatePickerInput from "./DatePickerInput/DatePickerInput.jsx";
import { formAction } from "../../../store/slices/formSlice";
import { apiAction, fetchRates, resetFilteredCars, filterOrder } from "../../../store/slices/apiSlice";
import { validityAction } from "../../../store/slices/validationSlice";
import useCheckboxFilter from "../../../hooks/useCheckboxFilter";
import styles from "./ExtraStep.module.scss";

const ExtraStep = () => {
    const dispatch = useDispatch();
    const apiData = useSelector((state) => state.api);
    const formData = useSelector((state) => state.form);
    const [checked, check, carColor, changeColor, changeRate, checkWheel, checkChair, checkTank] = useCheckboxFilter();

    useEffect(() => {
        if (!formData.formLength.timeDate || !formData.formRate) {
            dispatch(validityAction({ extraValid: false }));
            dispatch(validityAction({ totalValid: false }));
        } else {
            dispatch(validityAction({ extraValid: true }));
            dispatch(validityAction({ totalValid: true }));
        }
    }, [formData.formLength.timeDate, formData.formRate]);

    useEffect(() => {
        dispatch(resetFilteredCars());
    }, []);

    useEffect(() => {
        if (apiData.rates.status === "idle") {
            dispatch(fetchRates());
        }
    }, [apiData.rates.status]);

    useEffect(() => {
        if (apiData.rates.data.length !== 0) {
            dispatch(
                formAction({
                    formRate: {
                        name: apiData.rates.data[0].rateTypeId.name,
                        id: apiData.rates.data[0].id,
                        price: apiData.rates.data[0].price,
                    },
                }),
            );
        }
    }, [apiData.rates.data]);

    useEffect(() => {
        if (apiData.selectedCar) {
            dispatch(filterOrder(apiData.selectedCar.id));
        }
    }, [apiData.selectedCar]);

    useEffect(() => {
        if (formData.formLength.timeSec > 0 && formData.formRate.name === "Поминутно") {
            const calcPrice = formData.formRate.price * formData.formLength.minutes;
            dispatch(formAction({ price: calcPrice }));
        } else if (formData.formLength.timeSec > 0 && formData.formRate.name === "Суточный") {
            const chargeDays = Math.ceil(formData.formLength.hours / 24);
            const calcPrice = formData.formRate.price * chargeDays;
            dispatch(formAction({ price: calcPrice }));
        }
    }, [formData.formLength.timeSec, formData.formRate.name]);

    return (
        <form className={styles.extraForm}>
            <div className={styles.extraContainer}>
                <div className={styles.inputContainer}>
                    <p className={styles.containerTitle}>Цвет</p>
                    <div className={styles.radioContainer}>
                        {apiData.colors.length > 0 &&
                            apiData.colors.map((color, index) => (
                                <Radio
                                    key={index}
                                    value={color.value}
                                    name={color.name}
                                    checked={formData.formColor}
                                    onChange={changeColor}
                                    item={color}
                                />
                            ))}
                    </div>
                </div>

                <div className={styles.inputContainer}>
                    <p className={styles.containerTitle}>Дата аренды</p>
                    <DatePickerInput />
                </div>

                <div className={styles.inputContainer}>
                    <p className={styles.containerTitle}>Тариф</p>
                    <div className={styles.radioContainerVer}>
                        {apiData.rates.data.length > 0 &&
                            apiData.rates.data.map((rate) => (
                                <Radio
                                    key={rate.id}
                                    price={rate.price}
                                    name={`${rate.rateTypeId.name}, ${rate.price} ₽/${rate.rateTypeId.unit}`}
                                    value={rate.rateTypeId.name}
                                    checked={formData.formRate.name}
                                    item={rate}
                                    onChange={changeRate}
                                />
                            ))}
                    </div>
                </div>

                <div className={styles.inputContainer}>
                    <p className={styles.containerTitle}>Доп услуги</p>
                    <Checkbox
                        value={formData.isFullTank.value}
                        name={`${formData.isFullTank.name}, ${formData.isFullTank.price}р`}
                        onChange={checkTank}
                        checked={formData.isFullTank.value === true}
                        disabled={!formData.formRate}
                    />
                    <Checkbox
                        value={formData.isNeedChildChair.value}
                        name={`${formData.isNeedChildChair.name}, ${formData.isNeedChildChair.price}р`}
                        onChange={checkChair}
                        checked={formData.isNeedChildChair.value === true}
                        disabled={!formData.formRate}
                    />
                    <Checkbox
                        value={formData.isRightWheel.value}
                        name={`${formData.isRightWheel.name}, ${formData.isRightWheel.price}р`}
                        onChange={checkWheel}
                        checked={formData.isRightWheel.value === true}
                        disabled={!formData.formRate}
                    />
                </div>
            </div>
        </form>
    );
};

export default ExtraStep;
