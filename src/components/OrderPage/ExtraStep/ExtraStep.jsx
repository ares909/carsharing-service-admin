import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import classNames from "classnames";
import { resetFilteredCars, filterOrder, formAction, fetchRates } from "../../../store/slices/formSlice";
import FormSubmit from "../Common/FormSubmit/FormSubmit.jsx";
import OrderContainer from "../Common/OrderContainer/OrderContainer.jsx";
import Radio from "../../Common/UI/Radio/Radio.jsx";
import Checkbox from "../../Common/UI/Checkbox/Checkbox.jsx";
import PriceContainer from "../Common/PriceContainer/PriceContainer.jsx";
import useNumberFormat from "../../../hooks/useNumberFormat";
import useModal from "../../../hooks/useModal";
import useCheckboxFilter from "../../../hooks/useCheckboxFilter";
import styles from "./ExtraStep.module.scss";
import DatePickerInput from "./DatePickerInput/DatePickerInput.jsx";
import Button from "../../Common/UI/Button.jsx";

const ExtraStep = () => {
    const dispatch = useDispatch();
    const [isOpened, toggle] = useModal();
    const { convertNumber } = useNumberFormat();
    const stateForm = useSelector((state) => state.form);
    const cars = useSelector((state) => state.form.order.cars);
    const filteredCars = useSelector((state) => state.form.filteredCars);
    const colors = useSelector((state) => state.form.colors);
    const categories = useSelector((state) => state.form.order.categories);
    const city = useSelector((state) => state.form.city);
    const point = useSelector((state) => state.form.point);
    const selectedCar = useSelector((state) => state.form.selectedCar);
    const isFullTank = useSelector((state) => state.form.isFullTank);
    const isNeedChildChair = useSelector((state) => state.form.isNeedChildChair);
    const isRightWheel = useSelector((state) => state.form.isRightWheel);
    const formColor = useSelector((state) => state.form.formColor);
    const formRate = useSelector((state) => state.form.formRate);
    const price = useSelector((state) => Number(state.form.price));
    const [checked, check, carColor, changeColor, changeRate] = useCheckboxFilter();
    const [pickedCar, setPickedCar] = useState({ car: selectedCar });
    const orderStatus = useSelector((state) => state.form.order.status);
    const rates = useSelector((state) => state.form.rates.data);
    const rateStatus = useSelector((state) => state.form.rates.status);
    const order = useSelector((state) => state.form.order.data);
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
            if (!isOpened) {
                toggle();
            }
        }
    }, [formLength.timeDate, formRate]);

    const handleChangeColor = (color) => {
        changeColor(color);
    };

    const checkTank = () => {
        // setTank(!value);
        if (isFullTank.value === "false") {
            dispatch(
                formAction({
                    isFullTank: {
                        value: "true",
                        name: isFullTank.name,
                        id: isFullTank.id,
                        price: isFullTank.price,
                        form: "Да",
                    },
                    price: price + isFullTank.price,
                }),
            );
        } else {
            dispatch(
                formAction({
                    isFullTank: {
                        value: "false",
                        name: isFullTank.name,
                        id: isFullTank.id,
                        price: isFullTank.price,
                        form: "Нет",
                    },
                    price: price - isFullTank.price,
                }),
            );
        }
    };

    const checkChair = () => {
        // setTank(!value);
        if (isNeedChildChair.value === "false") {
            dispatch(
                formAction({
                    isNeedChildChair: {
                        value: "true",
                        name: isNeedChildChair.name,
                        id: isNeedChildChair.id,
                        price: isNeedChildChair.price,
                        form: "Да",
                    },
                    price: price + isNeedChildChair.price,
                }),
            );
        } else {
            dispatch(
                formAction({
                    isNeedChildChair: {
                        value: "false",
                        name: isNeedChildChair.name,
                        id: isNeedChildChair.id,
                        price: isNeedChildChair.price,
                        form: "Нет",
                    },
                    price: price - isNeedChildChair.price,
                }),
            );
        }
    };

    const checkWheel = () => {
        // setTank(!value);
        if (isRightWheel.value === "false") {
            dispatch(
                formAction({
                    isRightWheel: {
                        value: "true",
                        name: isRightWheel.name,
                        id: isRightWheel.id,
                        price: isRightWheel.price,
                        form: "Да",
                    },
                    price: price + isRightWheel.price,
                }),
            );
        } else {
            dispatch(
                formAction({
                    isRightWheel: {
                        value: "false",
                        name: isRightWheel.name,
                        id: isRightWheel.id,
                        price: isRightWheel.price,
                        form: "Нет",
                    },
                    price: price - isRightWheel.price,
                }),
            );
        }
    };

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
        if (formLength.timeSec && formRate.name === "Поминутно") {
            const calcPrice = formRate.price * formLength.minutes;
            dispatch(formAction({ price: calcPrice }));
        } else if (formLength.timeSec && formRate.name === "Суточный") {
            const chargeDays = Math.ceil(formLength.hours / 24);
            const calcPrice = formRate.price * chargeDays;
            dispatch(formAction({ price: calcPrice }));
        }
    }, [formLength.timeSec, formRate.name]);

    return (
        <form className={styles.extraForm}>
            <div className={styles.extraContainer}>
                <div className={styles.inputContainer}>
                    <p className={styles.containerTitle}>Цвет</p>
                    <div className={styles.radioContainer}>
                        {
                            // eslint-disable-next-line no-nested-ternary
                            colors.length > 0 &&
                                colors.map((color, index) => (
                                    <Radio
                                        key={index}
                                        value={color.value}
                                        name={color.name}
                                        checked={formColor}
                                        onChange={handleChangeColor}
                                        item={color}
                                    />
                                ))
                        }
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
                {/* <Checkbox
                value={isNeedChildChair.value}
                name={isNeedChildChair.name}
                checked={carColor}
                onChange={handleChangeColor}
            />
            <Checkbox value={isRightWheel.value} name={isRightWheel.name} checked={tank} onChange={handleChangeColor} /> */}
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
