import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import { apiData } from "../../../../store/selectors/selectors";
import Button from "../../../Common/UI/Button.jsx";
import RateInput from "../../CitiesList/CityInput/CityInput.jsx";
import { createRate } from "../../../../store/actions/apiActions";
import rateValidationSchema from "../../../../validation/rateValidation";
import useMapper from "../../../../hooks/useMapper";
import { inputArray } from "../../../../constants/rateConstants";
import approveButton from "../../../../images/admin/approveButton.svg";
import cancelButton from "../../../../images/admin/cancelButton.svg";
import styles from "./RateInputBar.module.scss";

const PointInputBar = () => {
    const dispatch = useDispatch();
    const { rates } = useSelector(apiData);
    const mapObject = useMapper();

    const {
        register,
        getValues,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(rateValidationSchema),
        context: { rates },
        mode: "onSubmit",
    });

    const handlePostRate = (data) => {
        const values = mapObject({ dataType: "rateData", data });
        dispatch(
            createRate({
                rate: {
                    ...values,
                },
            }),
        );

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
                    {inputArray.map((item) => (
                        <div className={styles.inputContainer} key={item.id}>
                            <RateInput
                                defaulValue=""
                                type={item.type}
                                placeholder={item.placeholder}
                                register={register}
                                errors={errors}
                                name={item.name}
                                id={item.id}
                                reset={reset}
                            />
                        </div>
                    ))}
                </div>

                <div className={styles.formButtonContainer}>
                    <Button
                        name="Создать"
                        type="submit"
                        onClick={handleSubmit(handlePostRate)}
                        className={styles.formButton}
                    />
                    <Button name="Сбросить" type="button" onClick={handleReset} className={styles.formButtonRed} />
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
