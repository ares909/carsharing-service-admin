import React, { useState, useEffect, useRef } from "react";
import Select, { createFilter } from "react-select";
import { useSelector, useDispatch } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import classNames from "classnames";
import { authState, apiData } from "../../../../store/selectors/selectors";
import Button from "../../../Common/UI/Button.jsx";
import RateInput from "../../CitiesList/CityInput/CityInput.jsx";
import {
    apiAction,
    createCity,
    fetchAllOrders,
    resetApiFilters,
    resetFilteredCars,
    fetchCities,
    createPoint,
    fetchPoints,
    createRate,
} from "../../../../store/slices/apiSlice";
import approveButton from "../../../../images/admin/approveButton.svg";
import cancelButton from "../../../../images/admin/cancelButton.svg";

import styles from "./RateInputBar.module.scss";

const PointInputBar = () => {
    const dispatch = useDispatch();
    const { rates } = useSelector(apiData);
    const validationSchema = yup.object().shape({
        tariff: yup
            .string()
            .required("Поле не должно быть пустым")
            .test(
                "tariff",
                "Данный тариф уже существует",
                (value) => value && !rates.data.map((item) => item.rateTypeId.name).includes(value),
            ),
        unit: yup.string().required("Поле не должно быть пустым"),
        tariffPrice: yup.number().required("Поле не должно быть пустым").typeError("Пожалуйста, введите число"),
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

    const handlePostRate = (data) => {
        dispatch(
            createRate({
                rate: {
                    name: data.tariff,
                    unit: data.unit,
                    price: data.tariffPrice,
                },
            }),
        );

        reset();
    };

    const handleReset = (e) => {
        e.preventDefault();
        reset();
    };

    const approveButtonClassName = classNames({
        [`${styles.formButton}`]: true,
    });

    const clearButtonClassName = classNames({
        [`${styles.formButtonRed}`]: true,
    });

    const buttonImageClassName = classNames({
        [`${styles.formButtonImage}`]: true,
    });

    return (
        <div>
            <form className={styles.filterBar}>
                <div className={styles.inputContainer}>
                    <RateInput
                        defaulValue=""
                        type="text"
                        placeholder="Название"
                        register={register}
                        errors={errors}
                        name="tariff"
                        id="tariff"
                        reset={reset}
                        // label="city"
                    />
                </div>
                <div className={styles.inputContainer}>
                    <RateInput
                        defaulValue=""
                        type="text"
                        placeholder="Единица"
                        register={register}
                        errors={errors}
                        name="unit"
                        id="unit"
                        reset={reset}
                        // label="city"
                    />
                </div>
                <div className={styles.inputContainer}>
                    <RateInput
                        defaulValue=""
                        type="text"
                        placeholder="Цена"
                        register={register}
                        errors={errors}
                        name="tariffPrice"
                        id="tariffPrice"
                        reset={reset}
                        // label="city"
                    />
                </div>
                <div className={styles.formButtonContainer}>
                    <Button
                        name="Создать"
                        type="submit"
                        onClick={handleSubmit(handlePostRate)}
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
                    <Button type="submit" onClick={handleSubmit(handlePostRate)} className={buttonImageClassName}>
                        <img src={approveButton} />
                    </Button>
                    <Button onClick={handleReset} className={buttonImageClassName}>
                        <img src={cancelButton} />
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default PointInputBar;
