import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { formAction } from "../../../store/slices/formSlice";
import { fetchCities } from "../../../store/slices/locationSlice";
import useAutocomplete from "../../../hooks/useAutocomplete";
import Autocomplete from "./Autocomplete.jsx";

import Button from "../../Common/UI/Button.jsx";

const LocationStep = () => {
    const stateForm = useSelector((state) => state.form);
    const dataStatus = useSelector((state) => state.location.status);
    const cities = useSelector((state) => state.location.cities);
    const { push } = useHistory();
    const dispatch = useDispatch();
    const { onChange, onClick, suggestionsListComponent, userInput, cityId } = useAutocomplete(cities);

    useEffect(() => {
        if (dataStatus === "idle") {
            dispatch(fetchCities());
        }
    }, [dataStatus]);

    const { handleSubmit, errors, register } = useForm({
        defaultValues: stateForm,
    });
    // const {} = useSelector()
    const onSubmit = (data) => {
        dispatch(formAction(data));
        console.log(data);
        console.log(cityId);
    };

    // const handleChange = (e) => {
    //     onChange(e);
    // };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>
                Город
                <input type="search" {...register("city")} value={userInput} onChange={onChange} />
                {suggestionsListComponent}
            </label>

            <label>
                Пункт выдачи
                <select {...register("point")}></select>
            </label>
            <Button type="submit" name="Выбрать модель" />
        </form>
    );
};

export default LocationStep;
