import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterCars, formAction } from "../store/slices/formSlice";

const useCheckboxFilter = () => {
    const dispatch = useDispatch();
    const isFullTank = useSelector((state) => state.form.isFullTank);
    const isNeedChildChair = useSelector((state) => state.form.isNeedChildChair);
    const isRightWheel = useSelector((state) => state.form.isRightWheel);
    const defaultCarValue = "Все модели";
    const defaultColor = "Любой";
    const [checked, setChecked] = useState(defaultCarValue);
    const [carColor, setColor] = useState(defaultColor);
    const [tank, setTank] = useState(false);

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
        dispatch(formAction({ price: "" }));
        dispatch(
            formAction({
                isFullTank: {
                    value: "false",
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
                    value: "false",
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
                    value: "false",
                    name: isRightWheel.name,
                    id: isRightWheel.id,
                    price: isRightWheel.price,
                    form: "Нет",
                },
            }),
        );
    };

    return [checked, check, carColor, changeColor, changeRate];
};

export default useCheckboxFilter;
