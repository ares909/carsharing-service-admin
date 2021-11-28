import React, { useState, useEffect, useRef } from "react";
import Select, { createFilter } from "react-select";
import { useSelector, useDispatch } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import classNames from "classnames";
import { authState, apiData } from "../../../../store/selectors/selectors";
import Button from "../../../Common/UI/Button.jsx";
import PointInput from "../../CitiesList/CityInput/CityInput.jsx";
import {
    apiAction,
    createCity,
    fetchAllOrders,
    resetApiFilters,
    resetFilteredCars,
    fetchCities,
    createPoint,
    fetchPoints,
} from "../../../../store/slices/apiSlice";
import approveButton from "../../../../images/admin/approveButton.svg";
import cancelButton from "../../../../images/admin/cancelButton.svg";

import styles from "./PointInputBar.module.scss";

const PointInputBar = ({ cityId }) => {
    const dispatch = useDispatch();
    const { points } = useSelector(apiData);
    const validationSchema = yup.object().shape({
        pointAddress: yup
            .string()
            .required("Поле не должно быть пустым")
            .test(
                "pointAddress",
                "Данный адрес уже существует",
                (value) => value && !points.data.map((item) => item.address).includes(value),
            ),
        pointName: yup.string().required("Поле не должно быть пустым"),
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

    const handlePostPoint = (data) => {
        dispatch(
            createPoint({
                point: {
                    name: data.pointName,
                    address: data.pointAddress,
                },
                cityId,
            }),
        );
        dispatch(fetchPoints(cityId));
        console.log(data);

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
                    <PointInput
                        defaulValue=""
                        type="text"
                        placeholder="Введите адрес"
                        register={register}
                        errors={errors}
                        name="pointAddress"
                        id="pointAddress"
                        reset={reset}
                        // label="city"
                    />
                </div>
                <div className={styles.inputContainer}>
                    <PointInput
                        defaulValue=""
                        type="text"
                        placeholder="Введите ориентир"
                        register={register}
                        errors={errors}
                        name="pointName"
                        id="pointName"
                        reset={reset}
                        // label="city"
                    />
                </div>
                <div className={styles.formButtonContainer}>
                    <Button
                        name="Создать"
                        type="submit"
                        onClick={handleSubmit(handlePostPoint)}
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
                    <Button type="submit" onClick={handleSubmit(handlePostPoint)} className={buttonImageClassName}>
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
