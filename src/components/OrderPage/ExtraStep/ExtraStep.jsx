import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import classNames from "classnames";

import FormSubmit from "../Common/FormSubmit/FormSubmit.jsx";
import OrderContainer from "../Common/OrderContainer/OrderContainer.jsx";
import Radio from "../../Common/UI/Radio/Radio.jsx";
import Checkbox from "../../Common/UI/Checkbox/Checkbox.jsx";
import PriceContainer from "../Common/PriceContainer/PriceContainer.jsx";
import DatePickerInput from "./DatePickerInput/DatePickerInput.jsx";
import Button from "../../Common/UI/Button.jsx";
import { resetFilteredCars, filterOrder, formAction, fetchRates } from "../../../store/slices/formSlice";
import useNumberFormat from "../../../hooks/useNumberFormat";
import useModal from "../../../hooks/useModal";
import useCheckboxFilter from "../../../hooks/useCheckboxFilter";
import styles from "./ExtraStep.module.scss";

const ExtraStep = () => {
    const dispatch = useDispatch();
    const [isOpened, toggle] = useModal();
    const { convertNumber } = useNumberFormat();
    const stateForm = useSelector((state) => state.form);
    const colors = useSelector((state) => state.form.colors);

    const city = useSelector((state) => state.form.city);
    const point = useSelector((state) => state.form.point);
    const selectedCar = useSelector((state) => state.form.selectedCar);
    const isFullTank = useSelector((state) => state.form.isFullTank);
    const isNeedChildChair = useSelector((state) => state.form.isNeedChildChair);
    const isRightWheel = useSelector((state) => state.form.isRightWheel);
    const formColor = useSelector((state) => state.form.formColor);
    const formRate = useSelector((state) => state.form.formRate);
    const price = useSelector((state) => Number(state.form.price));
    const [checked, check, carColor, changeColor, changeRate, checkWheel, checkChair, checkTank] = useCheckboxFilter();
    const rates = useSelector((state) => state.form.rates.data);
    const rateStatus = useSelector((state) => state.form.rates.status);
    const formLength = useSelector((state) => state.form.formLength);
    const buttonClassName = classNames({
        [`${styles.formButton}`]: true,
        [`${styles.formButtonDisabled}`]: !stateForm.extraValid,
    });

    const { push } = useHistory();

    const location = {
        pathname: "/order/total",
    };
    const onSubmit = () => {
        push(location);
    };

    useEffect(() => {
        if (!formLength.timeDate || !formRate) {
            dispatch(formAction({ extraValid: false }));
            dispatch(formAction({ totalValid: false }));
        } else {
            dispatch(formAction({ extraValid: true }));
            dispatch(formAction({ totalValid: true }));
        }
    }, [formLength.timeDate, formRate]);

    const handleModalClick = () => {
        if (!isOpened) {
            toggle();
        }
    };

    useEffect(() => {
        dispatch(resetFilteredCars());
    }, []);

    useEffect(() => {
        if (rateStatus === "idle") {
            dispatch(fetchRates());
        }
    }, [rateStatus]);

    useEffect(() => {
        if (selectedCar) {
            dispatch(filterOrder(selectedCar.id));
        }
    }, [selectedCar]);

    useEffect(() => {
        if (formLength.timeSec && formRate.name === "Поминутно" && price === 0) {
            const calcPrice = formRate.price * formLength.minutes;
            dispatch(formAction({ price: calcPrice }));
        } else if (formLength.timeSec && formRate.name === "Суточный" && price === 0) {
            const chargeDays = Math.ceil(formLength.hours / 24);
            const calcPrice = formRate.price * chargeDays;
            dispatch(formAction({ price: calcPrice }));
        }
    }, [formLength.timeSec, formRate.name, price]);

    return (
        <form className={styles.extraForm}>
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
                        {rates.length > 0 &&
                            rates.map((rate) => (
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
                        checked={isFullTank.value === "true"}
                        disabled={!formRate}
                    />
                    <Checkbox
                        value={isNeedChildChair.value}
                        name={`${isNeedChildChair.name}, ${isNeedChildChair.price}р`}
                        onChange={checkChair}
                        checked={isNeedChildChair.value === "true"}
                        disabled={!formRate}
                    />
                    <Checkbox
                        value={isRightWheel.value}
                        name={`${isRightWheel.name}, ${isRightWheel.price}р`}
                        onChange={checkWheel}
                        checked={isRightWheel.value === "true"}
                        disabled={!formRate}
                    />
                </div>
            </div>
            <FormSubmit
                onSubmit={onSubmit}
                buttonClassName={buttonClassName}
                buttonName="Итого"
                isDisabled={!stateForm.extraValid}
                isOpened={isOpened}
                toggle={toggle}
            >
                <div className={styles.orderStatusBox}>
                    <OrderContainer name="Пункт выдачи" data={`${city.name}, \n ${point.name}`} />
                    <OrderContainer name="Модель" data={`${selectedCar.name}`} />
                    <OrderContainer name="Цвет" data={`${formColor}`} />
                    <OrderContainer name="Длительность аренды" data={`${formLength.timeDate}`} />
                    <OrderContainer name="Тариф" data={`${formRate.name}`} />
                    <OrderContainer name="Полный бак" data={`${isFullTank.form}`} />
                </div>
                <PriceContainer price={price !== 0 && `${convertNumber(price)} ₽`} />
            </FormSubmit>
            <Button name="Ваши параметры" type="button" className={styles.modalButton} onClick={handleModalClick} />
        </form>
    );
};

export default ExtraStep;
