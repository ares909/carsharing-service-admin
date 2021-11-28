import React, { useState, useEffect, useRef } from "react";
import Select, { createFilter } from "react-select";
import { useSelector, useDispatch } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import classNames from "classnames";
import { authState, apiData } from "../../../../store/selectors/selectors";
import Button from "../../../Common/UI/Button.jsx";
import CityInput from "../CityInput/CityInput.jsx";
import {
    apiAction,
    createCity,
    fetchAllOrders,
    resetApiFilters,
    resetFilteredCars,
    fetchCities,
} from "../../../../store/slices/apiSlice";

import styles from "./CityInputBar.module.scss";

const CityInputBar = () => {
    const dispatch = useDispatch();
    const { cities } = useSelector(apiData);
    const validationSchema = yup.object().shape({
        сityName: yup
            .string()
            .required("Поле не должно быть пустым")
            .test(
                "сityName",
                "Данный город уже существует",
                (value) => value && !cities.data.map((item) => item.name).includes(value),
            ),
    });
    const {
        register,
        getValues,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(validationSchema),
        mode: "onSubmit",
    });

    const handlePostCity = (data) => {
        dispatch(createCity({ city: { name: data.сityName } }));
        dispatch(fetchCities());
        reset();
    };

    const handleReset = (e) => {
        e.preventDefault();
        reset();
    };

    return (
        <div>
            <form className={styles.filterBar}>
                <div className={styles.inputContainer}>
                    <CityInput
                        defaulValue=""
                        type="text"
                        placeholder="Введите название города"
                        register={register}
                        errors={errors}
                        name="сityName"
                        id="сityName"
                        reset={reset}
                        // label="city"
                    />
                </div>
                <div className={styles.formButtonContainer}>
                    <Button
                        name="Создать"
                        type="submit"
                        onClick={handleSubmit(handlePostCity)}
                        className={styles.formButton}
                        // disabled={apiFilters.status === "idle"}
                    />
                    <Button
                        name="Сбросить"
                        type="button"
                        onClick={handleReset}
                        className={styles.formButtonRed}
                        // disabled={apiFilters.status === "idle"}
                    />
                </div>
            </form>
        </div>
    );
};

export default CityInputBar;
