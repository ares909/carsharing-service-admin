import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { apiData } from "../../../../store/selectors/selectors";
import Button from "../../../Common/UI/Button.jsx";
import CityInput from "../CityInput/CityInput.jsx";
import { fetchCities, createCity } from "../../../../store/actions/apiActions";
import cityValidationSchema from "../../../../validation/cityValidation";

import styles from "./CityInputBar.module.scss";

const CityInputBar = ({ token }) => {
    const dispatch = useDispatch();
    const { cities } = useSelector(apiData);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(cityValidationSchema),
        context: { cities },
        mode: "onSubmit",
    });

    const handlePostCity = (data) => {
        dispatch(createCity({ city: { name: data.сityName }, token }));
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
                    />
                </div>
                <div className={styles.formButtonContainer}>
                    <Button
                        name="Создать"
                        type="submit"
                        onClick={handleSubmit(handlePostCity)}
                        className={styles.formButton}
                    />
                    <Button name="Сбросить" type="button" onClick={handleReset} className={styles.formButtonRed} />
                </div>
            </form>
        </div>
    );
};

export default CityInputBar;
