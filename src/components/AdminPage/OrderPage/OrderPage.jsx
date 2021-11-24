import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
    fetchOrder,
    fetchCities,
    fetchStatuses,
    fetchCars,
    fetchRates,
    postOrder,
    resetPopupMessage,
    fetchAllOrders,
} from "../../../store/slices/apiSlice";
import { apiData } from "../../../store/selectors/selectors";
import Button from "../../Common/UI/Button.jsx";
import SuccessPopup from "../../Common/UI/SuccessPopup/SuccessPopup.jsx";
import Preloader from "../../Common/UI/Preloader/Preloader.jsx";
import Checkbox from "../../Common/UI/Checkbox/Checkbox.jsx";
import OrderInput from "./OrderInput/OrderInput.jsx";
import useModal from "../../../hooks/useModal";
import { imageUrl, messages, pageSize } from "../../../constants/constants";
import useDateFormat from "../../../hooks/useDateFormat";
import styles from "./OrderPage.module.scss";

const OrderPage = () => {
    const { orderId } = useParams();
    const token = JSON.parse(localStorage.getItem("access_token"));
    const dispatch = useDispatch();
    const { push, goBack } = useHistory();
    const { statuses, singleOrder, status, cars, rates, cities, order, points, orderPrice, apiFilters } =
        useSelector(apiData);
    const [defaultValues, setDefaultValues] = useState({ city: "", address: "" });
    const [isPopupOpened, togglePopup] = useModal();
    const [popupMessage, setPopupMessage] = useState("");
    const validationSchema = yup.object().shape({
        city: yup.object().nullable().required("Поле не должно быть пустым"),
        address: yup.object().nullable().required("Поле не должно быть пустым"),
        car: yup.object().nullable().required("Поле не должно быть пустым"),
        color: yup.object().nullable().required("Поле не должно быть пустым"),
        rate: yup.object().nullable().required("Поле не должно быть пустым"),
        status: yup.object().nullable().required("Поле не должно быть пустым"),
        price: yup.object().nullable().required("Поле не должно быть пустым"),
    });
    const {
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

    const [convertDateToSeconds, secondsToDhms, secondsToMinutes, secondsToHours, stringToLocale, secondsToDays] =
        useDateFormat();

    useEffect(() => {
        if (orderId) {
            dispatch(fetchOrder(orderId));
        }
    }, [orderId]);

    useEffect(() => {
        if (order.status === "succeeded") {
            setDefaultValues({
                ...defaultValues,
                city: order.data.cityId
                    ? {
                          value: order.data.cityId.name,
                          label: order.data.cityId.name,
                          id: order.data.cityId.id,
                      }
                    : "",
                address: order.data.pointId
                    ? {
                          value: order.data.pointId.address,
                          label: order.data.pointId.address,
                          id: order.data.pointId.id,
                      }
                    : "",

                car: order.data.carId
                    ? {
                          value: order.data.carId.name,
                          label: order.data.carId.name,
                          id: order.data.carId.id,
                      }
                    : "",

                color: order.data
                    ? {
                          value: order.data.color,
                          label: order.data.color,
                          id: order.data.color,
                      }
                    : "",
                rate: order.data.rateId
                    ? {
                          value: order.data.rateId.rateTypeId.name,
                          label: order.data.rateId.rateTypeId.name,
                          id: order.data.rateId.id,
                          price: order.data.rateId.price,
                      }
                    : "",
                status: order.data.orderStatusId
                    ? {
                          value: order.data.orderStatusId.name,
                          label: order.data.orderStatusId.name,
                          id: order.data.orderStatusId.id,
                      }
                    : "",
                price: order.data.price
                    ? {
                          value: order.data.price,
                          label: order.data.price,
                          id: order.data.price,
                      }
                    : "",
                isFullTank: {
                    value: order.data.isFullTank,
                    label: order.data.isFullTank === true ? "Да" : "Нет",
                },

                isNeedChildChair: {
                    value: order.data.isNeedChildChair,
                    label: order.data.isNeedChildChair === true ? "Да" : "Нет",
                },

                isRightWheel: {
                    value: order.data.isRightWheel,
                    label: order.data.isRightWheel === true ? "Да" : "Нет",
                },
            });
        }
    }, [order.status]);

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues]);

    useEffect(() => {
        if (cars.status === "idle") {
            dispatch(fetchCities());
            dispatch(fetchStatuses());
            dispatch(fetchCars());
            dispatch(fetchRates());
        }
    }, [cars.status]);

    useEffect(() => {
        if (order.statusCode === 200 && order.postStatus === "saved") {
            if (!isPopupOpened) {
                setPopupMessage(messages.orderSaved);
                togglePopup();
            }
        }
    }, [order.statusCode, order.postStatus]);

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

    const handlePostOrder = (data) => {
        dispatch(
            postOrder({
                orderId,
                order: {
                    orderStatusId: data.status.id,
                    cityId: data.city.id,
                    pointId: data.address.id,
                    carId: data.car.id,
                    color: data.color.value,
                    rateId: data.rate.id,
                    price: orderPrice,
                    isFullTank: data.isFullTank.value,
                    isNeedChildChair: data.isNeedChildChair.value,
                    isRightWheel: data.isRightWheel.value,
                },
            }),
        );
    };

    const cityOptions = cities.data
        ? cities.data.map((item) => ({ value: item.name, label: item.name, id: item.id }))
        : [];

    const pointOptions = points.data
        ? points.data.map((item) => ({ value: item.address, label: item.address, id: item.id }))
        : [];

    const carOptions = cars.data ? cars.data.map((item) => ({ value: item.name, label: item.name, id: item.id })) : [];

    const colorOptions = order.data.carId
        ? order.data.carId.colors.map((item, index) => ({ value: item, label: item, id: index }))
        : [{ value: "Любой", label: "Любой", id: 1 }];

    const rateOptions = rates.data
        ? rates.data.map((item) => ({
              value: item.rateTypeId.name,
              label: item.rateTypeId.name,
              id: item.id,
              price: item.price,
          }))
        : [];

    const statusOptions = statuses.data
        ? statuses.data.map((item) => ({ value: item.name, label: item.name, id: item.id }))
        : [];

    const tankOptions = [
        { value: true, label: "Да", price: 500 },
        { value: false, label: "Нет", price: 500 },
    ];

    const chairOptions = [
        { value: true, label: "Да", price: 200 },
        { value: false, label: "Нет", price: 200 },
    ];

    const wheelOptions = [
        { value: true, label: "Да", price: 1600 },
        { value: false, label: "Нет", price: 1600 },
    ];

    const textOptions = [
        { title: "Город: ", data: order.data.cityId ? order.data.cityId.name : "нет данных" },
        { title: "Адрес: ", data: order.data.pointId ? order.data.pointId.address : "нет данных" },
        { title: "Модель: ", data: order.data.carId ? order.data.carId.name : "нет данных" },
        { title: "Цвет: ", data: order.data.color ? order.data.color : "нет данных" },
        { title: "Статус: ", data: order.data.orderStatusId ? order.data.orderStatusId.name : "нет данных" },
        { title: "Цена: ", data: order.data.price ? `${order.data.price} ₽` : "нет данных" },
        {
            title: "Срок: ",
            data:
                order.data.dateFrom && order.data.dateTo
                    ? secondsToDhms(order.data.dateTo - order.data.dateFrom)
                    : "нет данных",
        },
    ];

    const inputArray = [
        { name: "city", placeholder: "Город", label: "Город", id: "city", options: cityOptions },
        { name: "address", placeholder: "Адрес", label: "Адрес", id: "address", options: pointOptions },
        { name: "car", placeholder: "Модель", label: "Модель", id: "car", options: carOptions },
        { name: "color", placeholder: "Цвет", label: "Цвет", id: "color", options: colorOptions },
        { name: "rate", placeholder: "Тариф", label: "Тариф", id: "rate", options: rateOptions },
        { name: "status", placeholder: "Статус", label: "Статус", id: "status", options: statusOptions },
        { name: "isFullTank", placeholder: "Полный бак", label: "Полный бак", id: "isFullTank", options: tankOptions },
        {
            name: "isNeedChildChair",
            placeholder: "Детское кресло",
            label: "Детское кресло",
            id: "isNeedChildChair",
            options: chairOptions,
        },
        {
            name: "isRightWheel",
            placeholder: "Правый руль",
            label: "Правый руль",
            id: "isRightWheel",
            options: wheelOptions,
        },
    ];
    return (
        <section className={styles.orderPage}>
            <SuccessPopup isPopupOpened={isPopupOpened} togglePopup={togglePopup} popupMessage={popupMessage} />
            {singleOrder.status === "loading" && status !== "rejected" && <Preloader />}
            {cars.status === "loading" && status !== "rejected" && <Preloader />}
            {order.status === "loading" && status !== "rejected" && <Preloader />}
            {/* {points.status === "loading" && status !== "rejected" && <Preloader />} */}
            {order.status === "succeeded" && (
                <form className={styles.orderBox}>
                    <div className={styles.orderDataBox}>
                        <h2 className={styles.orderTitle}>
                            Заказ № <span className={styles.orderTitleTextBold}>{order.data.id}</span>
                        </h2>
                        <div className={styles.orderData}>
                            <div className={styles.orderImageBlock}>
                                <img
                                    className={styles.cardImage}
                                    src={
                                        // eslint-disable-next-line no-nested-ternary
                                        order.data.carId
                                            ? order.data.carId.thumbnail.path.includes("files")
                                                ? imageUrl + order.data.carId.thumbnail.path
                                                : order.data.carId.thumbnail.path
                                            : ""
                                    }
                                    alt="нет фото"
                                />
                            </div>

                            <div className={styles.orderInfo}>
                                {textOptions.map((item) => (
                                    <p className={styles.orderText} key={item.data}>
                                        {item.title}
                                        <span className={styles.orderTextBold}>{item.data}</span>
                                    </p>
                                ))}

                                <Checkbox
                                    value={order.data.isFullTank}
                                    name={`Полный бак`}
                                    checked={order.data.isFullTank === true}
                                    onChange={() => {}}
                                />
                                <Checkbox
                                    value={order.data.isNeedChildChair}
                                    name={`Детское кресло`}
                                    checked={order.data.isNeedChildChair === true}
                                    onChange={() => {}}
                                />
                                <Checkbox
                                    value={order.data.isRightWheel}
                                    name={`Правый руль`}
                                    checked={order.data.isRightWheel === true}
                                    onChange={() => {}}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.filterBox}>
                        <h2 className={styles.orderTitle}>Настройка заказа</h2>
                        <div className={styles.inputContainer}>
                            {inputArray.map((item) => (
                                <Controller
                                    name={item.name}
                                    control={control}
                                    key={item.id}
                                    // defaultValue={defaultValues.city}
                                    render={({ field }) => (
                                        <OrderInput
                                            label={item.label}
                                            placeholder={item.placeholder}
                                            field={field}
                                            errors={errors}
                                            name={item.name}
                                            id={item.id}
                                            options={item.options}
                                            reset={reset}
                                            getValues={getValues}

                                            // valueState={iniialValue.value ? iniialValue.value : ""}
                                        />
                                    )}
                                />
                            ))}
                        </div>
                        <div className={styles.formButtonContainer}>
                            <Button
                                className={styles.formButton}
                                onClick={handleSubmit(handlePostOrder)}
                                name="Сохранить"
                                type="submit"
                            />
                            <Button
                                className={styles.formButtonRed}
                                onClick={() => {
                                    goBack();
                                    dispatch(
                                        fetchAllOrders({
                                            token,
                                            filters: { page: 1, limit: pageSize, ...apiFilters.filters },
                                        }),
                                    );
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

export default OrderPage;
