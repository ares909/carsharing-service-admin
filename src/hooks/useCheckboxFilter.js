import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterCars } from "../store/slices/apiSlice";
import { formAction } from "../store/slices/formSlice";

const useCheckboxFilter = () => {
    const dispatch = useDispatch();
    const isFullTank = useSelector((state) => state.form.isFullTank);
    const isNeedChildChair = useSelector((state) => state.form.isNeedChildChair);
    const isRightWheel = useSelector((state) => state.form.isRightWheel);
    const price = useSelector((state) => Number(state.form.price));
    const defaultCarValue = "Все модели";
    const defaultColor = "Любой";
    const [checked, setChecked] = useState(defaultCarValue);
    const [carColor, setColor] = useState(defaultColor);

    const check = (value) => {
        setChecked(value.name);
        dispatch(filterCars(value.name));
    };

    const changeColor = (color) => {
        setColor(color);
        dispatch(formAction({ formColor: color.name }));
    };

    const changeRate = (rate) => {
        dispatch(formAction({ formRate: { name: rate.rateTypeId.name, id: rate.id, price: rate.price } }));
        dispatch(formAction({ price: 0 }));
        dispatch(
            formAction({
                isFullTank: {
                    value: false,
                    name: isFullTank.name,
                    id: isFullTank.id,
                    price: isFullTank.price,
                    form: "Нет",
                },
            }),
        );
        dispatch(
            formAction({
                isNeedChildChair: {
                    value: false,
                    name: isNeedChildChair.name,
                    id: isNeedChildChair.id,
                    price: isNeedChildChair.price,
                    form: "Нет",
                },
            }),
        );
        dispatch(
            formAction({
                isRightWheel: {
                    value: false,
                    name: isRightWheel.name,
                    id: isRightWheel.id,
                    price: isRightWheel.price,
                    form: "Нет",
                },
            }),
        );
    };

    const checkTank = () => {
        // setTank(!value);
        if (isFullTank.value === false) {
            dispatch(
                formAction({
                    isFullTank: {
                        value: true,
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
                        value: false,
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
        if (isNeedChildChair.value === false) {
            dispatch(
                formAction({
                    isNeedChildChair: {
                        value: true,
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
                        value: false,
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
        if (isRightWheel.value === false) {
            dispatch(
                formAction({
                    isRightWheel: {
                        value: true,
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
                        value: false,
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

    return [checked, check, carColor, changeColor, changeRate, checkWheel, checkChair, checkTank];
};

export default useCheckboxFilter;
