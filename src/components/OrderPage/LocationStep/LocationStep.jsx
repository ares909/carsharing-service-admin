import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import Button from "../../Common/UI/Button.jsx";

const LocationStep = () => {
    const { handleSubmit, errors, register } = useForm();
    const { push } = useHistory();
    const onSubmit = (data) => {
        // push("order/model");
        console.log(data);
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>
                Город
                <input type="search" {...register("city")} />
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
