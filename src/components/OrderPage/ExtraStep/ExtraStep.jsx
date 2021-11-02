import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import Radio from "../../Common/UI/Radio/Radio.jsx";
import Checkbox from "../../Common/UI/Checkbox/Checkbox.jsx";
import DatePickerInput from "./DatePickerInput/DatePickerInput.jsx";
import Preloader from "../../Common/UI/Preloader/Preloader.jsx";
import { apiData, formData, validationState } from "../../../store/selectors/selectors";
import { formAction } from "../../../store/slices/formSlice";
import { apiAction, fetchRates, resetFilteredCars, filterOrder } from "../../../store/slices/apiSlice";
import { validityAction } from "../../../store/slices/validationSlice";
import useCheckboxFilter from "../../../hooks/useCheckboxFilter";
import styles from "./ExtraStep.module.scss";

const ExtraStep = () => {
    const dispatch = useDispatch();
    const { push } = useHistory();
    const { rates, selectedCar, colors, status } = useSelector(apiData);
    const { formLength, formRate, formColor, isFullTank, isNeedChildChair, isRightWheel } = useSelector(formData);
    const { locationValid } = useSelector(validationState);
    const [checked, check, carColor, changeColor, changeRate, checkWheel, checkChair, checkTank] = useCheckboxFilter();

    useEffect(() => {
        if (locationValid === false) {
            push("/order");
        }
    }, [locationValid]);

    useEffect(() => {
        if (!formLength.timeDate || !formRate) {
            dispatch(validityAction({ extraValid: false }));
            dispatch(validityAction({ totalValid: false }));
        } else {
            dispatch(validityAction({ extraValid: true }));
            dispatch(validityAction({ totalValid: true }));
        }
    }, [formLength.timeDate, formRate]);

    useEffect(() => {
        dispatch(resetFilteredCars());
    }, []);

    useEffect(() => {
        if (rates.status === "idle") {
            dispatch(fetchRates());
        }
    }, [rates.status]);

    useEffect(() => {
        if (rates.data.length !== 0) {
            dispatch(
                formAction({
                    formRate: {
                        name: rates.data[0].rateTypeId.name,
                        id: rates.data[0].id,
                        price: rates.data[0].price,
                    },
                }),
            );
        }
    }, [rates.data]);

    useEffect(() => {
        if (selectedCar) {
            dispatch(filterOrder(selectedCar.id));
        }
    }, [selectedCar]);

    const calcPrice = () => {
        let price;
        let chargeDays;

        switch (formRate.name) {
            case "Поминутно":
                price = formRate.price * formLength.minutes;
                dispatch(formAction({ price }));
                break;

            case "Суточный":
                chargeDays = Math.ceil(formLength.hours / 24);
                price = formRate.price * chargeDays;
                dispatch(formAction({ price }));
                break;

            case "Недельный (Акция!)":
                chargeDays = Math.ceil(formLength.days / 7);
                price = chargeDays === 1 ? formRate.price * 7 : formRate.price * 7 * chargeDays;
                dispatch(formAction({ price }));
                break;

            case "Месячный":
                chargeDays = Math.ceil(formLength.days / 30);
                price = chargeDays === 1 ? formRate.price * 30 : formRate.price * 30 * chargeDays;
                dispatch(formAction({ price }));
                break;
            default:
                price = formRate.price * formLength.minutes;
                dispatch(formAction({ price }));
                break;
        }
    };

    useEffect(() => {
        if (formLength.timeSec > 0 && formRate.name) {
            calcPrice();
        }
    }, [formLength.timeSec, formRate.name]);

    return (
        <form className={styles.extraForm}>
            {status === "rejected" && rates.status !== "succeeded" && (
                <div className={styles.containerTitle}>Произошла ошибка при загрузке данных с сервера</div>
            )}
            {rates.status === "loading" && <Preloader />}
            {rates.status === "succeeded" && (
                <div className={styles.extraContainer}>
                    <div className={styles.inputContainer}>
                        <p className={styles.containerTitle}>Цвет</p>
                        <div className={styles.radioContainer}>
                            {colors.length > 0 &&
                                colors.map((color, index) => (
                                    <Radio
                                        key={index}
                                        value={color.value}
                                        name={color.name}
                                        checked={formColor}
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
                            {rates.data.length > 0 &&
                                rates.data.map((rate) => (
                                    <Radio
                                        key={rate.id}
                                        price={rate.price}
                                        name={`${rate.rateTypeId.name}, ${rate.price} ₽/${rate.rateTypeId.unit}`}
                                        value={rate.rateTypeId.name}
                                        checked={formRate.name}
                                        item={rate}
                                        onChange={changeRate}
                                    />
                                ))}
                        </div>
                    </div>

                    <div className={styles.inputContainer}>
                        <p className={styles.containerTitle}>Доп услуги</p>
                        <Checkbox
                            value={isFullTank.value}
                            name={`${isFullTank.name}, ${isFullTank.price}р`}
                            onChange={checkTank}
                            checked={isFullTank.value === true}
                            disabled={!formRate}
                        />
                        <Checkbox
                            value={isNeedChildChair.value}
                            name={`${isNeedChildChair.name}, ${isNeedChildChair.price}р`}
                            onChange={checkChair}
                            checked={isNeedChildChair.value === true}
                            disabled={!formRate}
                        />
                        <Checkbox
                            value={isRightWheel.value}
                            name={`${isRightWheel.name}, ${isRightWheel.price}р`}
                            onChange={checkWheel}
                            checked={isRightWheel.value === true}
                            disabled={!formRate}
                        />
                    </div>
                </div>
            )}
        </form>
    );
};

export default ExtraStep;
