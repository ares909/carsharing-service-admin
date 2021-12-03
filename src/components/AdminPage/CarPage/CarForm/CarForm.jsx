import React, { useEffect, useState, useRef } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, useLocation } from "react-router";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../../Common/UI/Button.jsx";
import SuccessPopup from "../../../Common/UI/SuccessPopup/SuccessPopup.jsx";
import Preloader from "../../../Common/UI/Preloader/Preloader.jsx";
import CarBlock from "../../CarList/CarCard/CarBlock/CarBlock.jsx";
import Checkbox from "../../../Common/UI/Checkbox/Checkbox.jsx";
import CarInputControlled from "../CarInputControlled/CarInputControlled.jsx";
import CarInput from "../CarInput/CarInput.jsx";
import CarFileInput from "../CarFileInput/CarFileInput.jsx";
import CarColorInput from "../CarColorInput/CarColorInput.jsx";
import { resetPopupMessage } from "../../../../store/slices/apiSlice";
import { apiData } from "../../../../store/selectors/selectors";
import useMapper from "../../../../hooks/useMapper";
import useModal from "../../../../hooks/useModal";
import { imageUrl, supprotedFormats } from "../../../../constants/constants";
import { textOptions, inputArray, categoryOptions } from "../../../../constants/carConstants";
import { messages } from "../../../../constants/messages";
import useConbertToBase64 from "../../../../hooks/useConvertBase64";
import useOnClickOutside from "../../../../hooks/useOnClickOutside";
import carCardValidationSchema from "../../../../validation/carValidation";
import styles from "./CarForm.module.scss";

const CarForm = ({
    handlePostCar,
    selectedCar,
    handleChangeColor,
    handleDeleteColor,
    handleAddColor,
    defaultValues,
    carId,
    colorOption,
    colors,
    setColors,
}) => {
    const [isPopupOpened, togglePopup] = useModal();
    const [popupMessage, setPopupMessage] = useState("");

    const dispatch = useDispatch();
    const location = useLocation();
    const { push, goBack } = useHistory();
    const { status, categories } = useSelector(apiData);
    const popupMessageRef = useRef(null);
    const carDataClassName = classNames({
        [`${styles.orderDataBox}`]: true,
        [`${styles.orderDataBoxDisabled}`]:
            location.pathname.includes("carcard") && selectedCar.postStatus !== "posted",
    });

    const {
        register,
        getValues,
        handleSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm({
        defaultValues,
        resolver: yupResolver(carCardValidationSchema),
        mode: "onSubmit",
    });

    useOnClickOutside(popupMessageRef, () => {
        if (isPopupOpened) {
            togglePopup();
            dispatch(resetPopupMessage());
            reset();
            if (setColors) {
                setColors([]);
            }
        }
    });
    useEffect(() => {
        if (selectedCar.statusCode === 200 && selectedCar.postStatus === "posted") {
            if (!isPopupOpened) {
                setPopupMessage(messages.carSaved);
                togglePopup();
            }
        } else if (selectedCar.statusCode === 200 && selectedCar.postStatus === "saved") {
            if (!isPopupOpened) {
                setPopupMessage(messages.carChanged);
                togglePopup();
            }
        }
    }, [selectedCar.statusCode, selectedCar.postStatus]);

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues]);

    return (
        <section className={styles.orderPage}>
            <SuccessPopup
                isPopupOpened={isPopupOpened}
                togglePopup={togglePopup}
                popupMessage={popupMessage}
                innerRef={popupMessageRef}
            />
            {selectedCar.status === "loading" && status !== "rejected" && <Preloader />}
            <form className={styles.orderBox} noValidate>
                <div className={carDataClassName}>
                    <h2 className={styles.orderTitle}>
                        <span className={styles.orderTitleTextBold}>{selectedCar.data.name}</span>
                    </h2>
                    <div className={styles.orderData}>
                        <CarBlock
                            type="image"
                            className={styles.orderImageBlock}
                            imageClassName={styles.cardImage}
                            data={
                                // eslint-disable-next-line no-nested-ternary
                                selectedCar.data.thumbnail
                                    ? selectedCar.data.thumbnail.path.includes("files")
                                        ? imageUrl + selectedCar.data.thumbnail.path
                                        : selectedCar.data.thumbnail.path
                                    : ""
                            }
                        />

                        <div className={styles.orderInfo}>
                            {textOptions(selectedCar).map((item, index) => (
                                <p className={styles.orderText} key={index}>
                                    {item.title}
                                    <span className={styles.orderTextBold}>{item.data}</span>
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={styles.filterBox}>
                    <h2 className={styles.orderTitle}>Настройки автомобиля</h2>
                    <div className={styles.inputContainer}>
                        {inputArray.map((item) => (
                            <CarInput
                                key={item.id}
                                type={item.type}
                                label={item.label}
                                placeholder={item.placeholder}
                                register={register}
                                errors={errors}
                                name={item.name}
                                id={item.id}
                                reset={reset}
                                getValues={getValues}
                            />
                        ))}
                        <CarFileInput
                            type="file"
                            label="Картинка"
                            placeholder="Картинка"
                            register={register}
                            errors={errors}
                            name="image"
                            id="image"
                            reset={reset}
                            getValues={getValues}
                        />
                        <Controller
                            name="category"
                            control={control}
                            render={({ field }) => (
                                <CarInputControlled
                                    label="Категория"
                                    placeholder="Категория"
                                    field={field}
                                    errors={errors}
                                    name="category"
                                    id="category"
                                    options={categoryOptions(categories)}
                                    reset={reset}
                                    getValues={getValues}
                                />
                            )}
                        />
                        <CarColorInput
                            colors={colors || defaultValues.colors}
                            onChange={handleChangeColor}
                            onClick={handleAddColor}
                            colorOption={colorOption}
                            handleDeleteColor={handleDeleteColor}
                        />
                    </div>

                    <div className={styles.formButtonContainer}>
                        <Button
                            className={styles.formButton}
                            onClick={handleSubmit(handlePostCar)}
                            name="Сохранить"
                            type="submit"
                        />
                        <Button
                            className={styles.formButtonRed}
                            onClick={() => {
                                goBack();
                            }}
                            name="Назад"
                            type="button"
                        />
                    </div>
                </div>
            </form>
        </section>
    );
};

export default CarForm;
