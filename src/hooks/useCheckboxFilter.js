import { useState } from "react";
import { useDispatch } from "react-redux";
import { filterCars } from "../store/slices/formSlice";

const useCheckboxFilter = () => {
    const dispatch = useDispatch();
    const defaultValue = "Все модели";
    const [checked, setChecked] = useState(defaultValue);
    const check = (value) => {
        setChecked(value);
        dispatch(filterCars(value));
    };

    return [checked, check];
};

export default useCheckboxFilter;
