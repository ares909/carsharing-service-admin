import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import classNames from "classnames";
import { apiData } from "../../../../store/selectors/selectors";
import Button from "../../../Common/UI/Button.jsx";
import PointInput from "../../CitiesList/CityInput/CityInput.jsx";
import { createPoint, fetchPoints } from "../../../../store/actions/apiActions";
import approveButton from "../../../../images/admin/approveButton.svg";
import cancelButton from "../../../../images/admin/cancelButton.svg";
import pointValidationSchema from "../../../../validation/pointValidation";
import styles from "./PointInputBar.module.scss";

const PointInputBar = ({ cityId, token }) => {
    const dispatch = useDispatch();
    const { points } = useSelector(apiData);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(pointValidationSchema),
        context: { points },
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
                token,
            }),
        );
        dispatch(fetchPoints(cityId));
        reset();
    };

    const handleReset = (e) => {
        e.preventDefault();
        reset();
    };

    const buttonImageClassName = classNames({
        [`${styles.formButtonImage}`]: true,
    });

    return (
        <div>
            <form className={styles.filterBar}>
                <div className={styles.inputBox}>
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
                        />
                    </div>
                </div>
                <div className={styles.formButtonContainer}>
                    <Button
                        name="Создать"
                        type="submit"
                        onClick={handleSubmit(handlePostPoint)}
                        className={styles.formButton}
                    />
                    <Button name="Сбросить" type="button" onClick={handleReset} className={styles.formButtonRed} />
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
