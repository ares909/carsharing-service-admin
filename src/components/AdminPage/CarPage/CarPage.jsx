import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { resetPopupMessage, fetchCar, fetchCategories, changeCar } from "../../../store/slices/apiSlice";
import { apiData } from "../../../store/selectors/selectors";
import Button from "../../Common/UI/Button.jsx";
import SuccessPopup from "../../Common/UI/SuccessPopup/SuccessPopup.jsx";
import Preloader from "../../Common/UI/Preloader/Preloader.jsx";
import Checkbox from "../../Common/UI/Checkbox/Checkbox.jsx";
import CarInputControlled from "./CarInputControlled/CarInputControlled.jsx";
import CarInput from "./CarInput/CarInput.jsx";
import CarFileInput from "./CarFileInput/CarFileInput.jsx";
import CarColorInput from "./CarColorInput/CarColorInput.jsx";

import useModal from "../../../hooks/useModal";
import { imageUrl, messages, supprotedFormats } from "../../../constants/constants";
import useDateFormat from "../../../hooks/useDateFormat";
import useNumberFormat from "../../../hooks/useNumberFormat";
import useConbertToBase64 from "../../../hooks/useConvertBase64";
import styles from "./CarPage.module.scss";

const CarPage = () => {
    const { carId } = useParams();
    const token = JSON.parse(localStorage.getItem("access_token"));
    const convertToBase64 = useConbertToBase64();
    const [convertNumber, convertCarNumber] = useNumberFormat();
    const dispatch = useDispatch();
    const { push, goBack } = useHistory();
    const { selectedCar, status, categories } = useSelector(apiData);
    const [defaultValues, setDefaultValues] = useState({
        name: "",
        number: "",
        priceMin: "",
        priceMax: "",
        colors: [],
    });
    const [isPopupOpened, togglePopup] = useModal();
    const [popupMessage, setPopupMessage] = useState("");
    const [colorOption, setColorOption] = useState();
    const validationSchema = yup.object().shape({
        name: yup.string().required("Поле не должно быть пустым"),
        number: yup.string().required("Поле не должно быть пустым"),
        category: yup.object().nullable().required("Поле не должно быть пустым"),
        priceMin: yup.number().typeError("Пожалуйста введите число").required("Поле не должно быть пустым"),
        priceMax: yup
            .number()
            .typeError("Пожалуйста введите число")
            .required("Поле не должно быть пустым")
            // eslint-disable-next-line consistent-return
            .when("priceMin", (priceMin) => {
                if (priceMin) {
                    return yup.number().min(priceMin, "Цена должна быть выше минимальной");
                }
            }),
        description: yup.string().required("Поле не должно быть пустым"),
        tank: yup.string().required("Поле не должно быть пустым"),
        image: yup
            .mixed()
            .test(
                "image",
                "Недопустимый формат файла",
                (value) => value[0] && supprotedFormats.includes(value[0].type),
            ),
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
        resolver: yupResolver(validationSchema),
        mode: "onSubmit",
    });

    useEffect(() => {
        if (carId) {
            dispatch(fetchCar(carId));
            dispatch(fetchCategories());
        }
    }, [carId]);

    useEffect(() => {
        if (selectedCar.status === "succeeded") {
            setDefaultValues({
                ...defaultValues,
                name: selectedCar.data.name ? selectedCar.data.name : "",
                number: selectedCar.data.number ? selectedCar.data.number : "",
                category: selectedCar.data.categoryId
                    ? {
                          value: selectedCar.data.categoryId,
                          label: selectedCar.data.categoryId.name,
                          id: selectedCar.data.categoryId.id,
                      }
                    : "",
                priceMin: selectedCar.data.priceMin ? convertNumber(selectedCar.data.priceMin) : "",
                priceMax: selectedCar.data.priceMax ? convertNumber(selectedCar.data.priceMax) : "",
                tank: selectedCar.data.tank ? selectedCar.data.tank : "",
                description: selectedCar.data.description ? selectedCar.data.description : "",
                colors: selectedCar.data.colors.length > 0 ? selectedCar.data.colors : [],
            });
        }
    }, [selectedCar.status]);

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues]);

    const categoryOptions =
        categories.data.length > 0
            ? categories.data.map((item) => ({ value: item.name, label: item.name, id: item.id }))
            : [];

    const handleChangeColor = (e) => {
        setColorOption(e.target.value);
    };

    const handleAddColor = (e) => {
        e.preventDefault();
        setDefaultValues({ ...defaultValues, colors: [...defaultValues.colors, colorOption] });
    };

    useEffect(() => {
        if (selectedCar.statusCode === 200 && selectedCar.postStatus === "saved") {
            if (!isPopupOpened) {
                setPopupMessage(messages.carChanged);
                togglePopup();
            }
        }
    }, [selectedCar.statusCode, selectedCar.postStatus]);

    const outSidePopupClick = (e) => {
        if (isPopupOpened && e.target.classList.length !== 0 && !e.target.className.includes("successPopup")) {
            togglePopup();
            dispatch(resetPopupMessage());
        }
    };
    useEffect(() => {
        document.addEventListener("click", outSidePopupClick, true);

        return () => {
            document.removeEventListener("click", outSidePopupClick, true);
        };
    });

    const handlePostCar = async (data) => {
        dispatch(
            changeCar({
                carId,
                car: {
                    priceMax: data.priceMax,
                    priceMin: data.priceMin,
                    name: data.name,
                    number: data.number,
                    colors: defaultValues.colors,
                    tank: data.tank,
                    thumbnail:
                        data.image.length > 0
                            ? {
                                  size: data.image[0].size,
                                  originalname: data.image[0].name,
                                  mimetype: data.image[0].type,
                                  path: await convertToBase64(data.image[0]),
                              }
                            : {
                                  size: selectedCar.data.thumbnail.size,
                                  originalname: selectedCar.data.thumbnail.originalname,
                                  mimetype: selectedCar.data.thumbnail.mimetype,
                                  path: selectedCar.data.thumbnail.path,
                              },
                    description: data.description,
                    categoryId: data.category.id,
                },
            }),
        );
    };
    const textOptions = [
        { title: "Модель: ", data: selectedCar.data.name ? selectedCar.data.name : "нет данных" },
        { title: "Номер: ", data: selectedCar.data.number ? selectedCar.data.number : "нет данных" },
        { title: "Категория: ", data: selectedCar.data.categoryId ? selectedCar.data.categoryId.name : "нет данных" },
        {
            title: "Цена от: ",
            data: selectedCar.data.priceMin ? `${convertNumber(selectedCar.data.priceMin)} ₽` : "нет данных",
        },
        {
            title: "Цена до: ",
            data: selectedCar.data.priceMax ? `${convertNumber(selectedCar.data.priceMax)} ₽` : "нет данных",
        },
        { title: "Топливо ", data: selectedCar.data.tank ? `${selectedCar.data.tank} %` : "нет данных" },

        {
            title: "Описание: ",
            data: selectedCar.data.description ? selectedCar.data.description : "нет данных",
        },
    ];

    const inputArray = [
        { name: "name", placeholder: "Модель", label: "Модель", id: "name", type: "text" },
        { name: "number", placeholder: "Номер", label: "Номер", id: "number", type: "text" },
        { name: "tank", placeholder: "Топливо", label: "Топливо", id: "tank", type: "text" },
        { name: "priceMin", placeholder: "Цена от", label: "Цена от", id: "priceMin", type: "text" },
        { name: "priceMax", placeholder: "Цена до", label: "Цена до", id: "priceMax", type: "text" },
        { name: "description", placeholder: "Описание", label: "Описание", id: "description", type: "textarea" },
    ];
    return (
        <section className={styles.orderPage}>
            <SuccessPopup isPopupOpened={isPopupOpened} togglePopup={togglePopup} popupMessage={popupMessage} />
            {selectedCar.status === "loading" && status !== "rejected" && <Preloader />}
            {selectedCar.status === "succeeded" && (
                <form className={styles.orderBox}>
                    <div className={styles.orderDataBox}>
                        <h2 className={styles.orderTitle}>
                            <span className={styles.orderTitleTextBold}>{selectedCar.data.name}</span>
                        </h2>
                        <div className={styles.orderData}>
                            <div className={styles.orderImageBlock}>
                                <img
                                    className={styles.cardImage}
                                    src={
                                        // eslint-disable-next-line no-nested-ternary
                                        selectedCar.data.thumbnail
                                            ? selectedCar.data.thumbnail.path.includes("files")
                                                ? imageUrl + selectedCar.data.thumbnail.path
                                                : selectedCar.data.thumbnail.path
                                            : ""
                                    }
                                    alt="нет фото"
                                />
                            </div>

                            <div className={styles.orderInfo}>
                                {textOptions.map((item, index) => (
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
                                        options={categoryOptions}
                                        reset={reset}
                                        getValues={getValues}
                                    />
                                )}
                            />
                            <CarColorInput
                                colors={defaultValues.colors}
                                onChange={handleChangeColor}
                                onClick={handleAddColor}
                                colorOption={colorOption}
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
            )}
        </section>
    );
};

export default CarPage;
