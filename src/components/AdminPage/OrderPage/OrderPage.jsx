import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
    apiAction,
    changeOrder,
    removeOrder,
    resetSingleOrder,
    resetDeletedOrder,
    fetchOrder,
    fetchCities,
    fetchStatuses,
    fetchCars,
    fetchRates,
    postOrder,
} from "../../../store/slices/apiSlice";
import { apiData } from "../../../store/selectors/selectors";
import Button from "../../Common/UI/Button.jsx";
import Preloader from "../../Common/UI/Preloader/Preloader.jsx";
import approveButton from "../../../images/admin/approveButton.svg";
import cancelButton from "../../../images/admin/cancelButton.svg";
import editButton from "../../../images/admin/editIcon.svg";
import styles from "./OrderPage.module.scss";
import Filter from "../Common/FilterBar/FilterElement/Filter.jsx";
import OrderInput from "./OrderInput/OrderInput.jsx";
import { imageUrl } from "../../../constants/constants";
import useDateFormat from "../../../hooks/useDateFormat";

const OrderPage = () => {
    const { orderId } = useParams();
    const dispatch = useDispatch();
    const { push } = useHistory();
    const { statuses, singleOrder, status, cars, rates, cities, order, points, orderPrice } = useSelector(apiData);
    const [defaultValues, setDefaultValues] = useState({ city: "", address: "" });
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
        register,
        getValues,
        handleSubmit,
        formState: { errors, isValid },
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

    // address: {
    //     value: order.data.pointId.name || "",
    //     label: order.data.pointId.name || "",
    //     id: order.data.pointId.id || "",
    // },

    useEffect(() => {
        if (cars.status === "idle") {
            dispatch(fetchCities());
            dispatch(fetchStatuses());
            dispatch(fetchCars());
            dispatch(fetchRates());
        }
    }, [cars.status]);

    // const defaultValues = {
    //     city: {
    //         id: order.data.cityId ? `${order.data.cityId.id}` : "",
    //         value: order.data.cityId ? order.data.cityId.name : "",
    //         label: order.data.cityId ? order.data.cityId.name : "",
    //     },
    //     address: { id: "123", value: "123", label: "123" },
    // };

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
        console.log(data);
        console.log(data.address.id);
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
        : [];

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
        { value: false, label: "Нет", price: -500 },
    ];

    const chairOptions = [
        { value: true, label: "Да", price: 200 },
        { value: false, label: "Нет", price: -200 },
    ];

    const wheelOptions = [
        { value: true, label: "Да", price: 1600 },
        { value: false, label: "Нет", price: -1600 },
    ];
    return (
        <section className={styles.orderPage}>
            {singleOrder.status === "loading" && status !== "rejected" && <Preloader />}
            {cars.status === "loading" && status !== "rejected" && <Preloader />}
            {/* {points.status === "loading" && status !== "rejected" && <Preloader />} */}
            {order.status === "succeeded" && (
                <form className={styles.orderBox}>
                    <div className={styles.orderData}>
                        <div className={styles.orderTitle}>
                            <p className={styles.orderText}>
                                Заказ № <span className={styles.orderTextBold}>{order.data.id}</span>
                            </p>
                            <p className={styles.orderText}>
                                Статус:{" "}
                                <span className={styles.orderTextBold}>
                                    {order.data.orderStatusId ? order.data.orderStatusId.name : "нет данных"}
                                </span>
                            </p>
                            <p className={styles.orderText}>
                                Цена: <span className={styles.orderTextBold}>{order.data.price}</span>
                            </p>
                        </div>
                        <div className={styles.orderTextBlock}>
                            <p className={styles.orderText}>Срок:</p>
                            <span className={styles.orderTextBold}>
                                {order.data.dateFrom && order.data.dateTo
                                    ? secondsToDhms(order.data.dateTo - order.data.dateFrom)
                                    : "нет данных"}
                            </span>
                        </div>
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
                    </div>
                    <div className={styles.FilterBox}>
                        <div>
                            <Controller
                                name="city"
                                control={control}
                                // defaultValue={defaultValues.city}
                                render={({ field }) => (
                                    <OrderInput
                                        placeholder="Город"
                                        field={field}
                                        errors={errors}
                                        name="city"
                                        id="city"
                                        options={cityOptions}
                                        reset={reset}
                                        getValues={getValues}

                                        // valueState={iniialValue.value ? iniialValue.value : ""}
                                    />
                                )}
                            />
                            <Controller
                                name="address"
                                control={control}
                                // defaultValue={defaultValues.address}
                                render={({ field }) => (
                                    <OrderInput
                                        placeholder="Адрес"
                                        field={field}
                                        errors={errors}
                                        name="address"
                                        id="address"
                                        options={pointOptions}
                                        getValues={getValues}
                                        // valueState={singleOrder.data.cityId ? singleOrder.data.cityId.name : ""}
                                    />
                                )}
                            />
                            <Controller
                                name="car"
                                control={control}
                                // defaultValue={defaultValues.address}
                                render={({ field }) => (
                                    <OrderInput
                                        placeholder="Модель"
                                        field={field}
                                        errors={errors}
                                        name="car"
                                        id="car"
                                        options={carOptions}
                                        getValues={getValues}
                                        // valueState={singleOrder.data.cityId ? singleOrder.data.cityId.name : ""}
                                    />
                                )}
                            />
                            <Controller
                                name="color"
                                control={control}
                                // defaultValue={defaultValues.address}
                                render={({ field }) => (
                                    <OrderInput
                                        placeholder="Цвет"
                                        field={field}
                                        errors={errors}
                                        name="color"
                                        id="color"
                                        options={colorOptions}
                                        getValues={getValues}
                                        // valueState={singleOrder.data.cityId ? singleOrder.data.cityId.name : ""}
                                    />
                                )}
                            />
                            <Controller
                                name="rate"
                                control={control}
                                // defaultValue={defaultValues.address}
                                render={({ field }) => (
                                    <OrderInput
                                        placeholder="Тариф"
                                        field={field}
                                        errors={errors}
                                        name="rate"
                                        id="rate"
                                        options={rateOptions}
                                        getValues={getValues}
                                        reset={reset}
                                        // valueState={singleOrder.data.cityId ? singleOrder.data.cityId.name : ""}
                                    />
                                )}
                            />
                            <Controller
                                name="status"
                                control={control}
                                // defaultValue={defaultValues.address}
                                render={({ field }) => (
                                    <OrderInput
                                        placeholder="Статус"
                                        field={field}
                                        errors={errors}
                                        name="status"
                                        id="status"
                                        options={statusOptions}
                                        getValues={getValues}
                                        // valueState={singleOrder.data.cityId ? singleOrder.data.cityId.name : ""}
                                    />
                                )}
                            />

                            <Controller
                                name="isFullTank"
                                control={control}
                                // defaultValue={defaultValues.address}
                                render={({ field }) => (
                                    <OrderInput
                                        placeholder="Полный бак"
                                        field={field}
                                        errors={errors}
                                        name="isFullTank"
                                        id="isFullTank"
                                        options={tankOptions}
                                        getValues={getValues}
                                        // disabled={true}
                                        // valueState={singleOrder.data.cityId ? singleOrder.data.cityId.name : ""}
                                    />
                                )}
                            />

                            <Controller
                                name="isNeedChildChair"
                                control={control}
                                // defaultValue={defaultValues.address}
                                render={({ field }) => (
                                    <OrderInput
                                        placeholder="Детское кресло"
                                        field={field}
                                        errors={errors}
                                        name="isNeedChildChair"
                                        id="isNeedChildChair"
                                        options={chairOptions}
                                        getValues={getValues}
                                        // disabled={true}
                                        // valueState={singleOrder.data.cityId ? singleOrder.data.cityId.name : ""}
                                    />
                                )}
                            />

                            <Controller
                                name="isRightWheel"
                                control={control}
                                // defaultValue={defaultValues.address}
                                render={({ field }) => (
                                    <OrderInput
                                        placeholder="Полный бак"
                                        field={field}
                                        errors={errors}
                                        name="isRightWheel"
                                        id="isRightWheel"
                                        options={wheelOptions}
                                        getValues={getValues}
                                        // disabled={true}
                                        // valueState={singleOrder.data.cityId ? singleOrder.data.cityId.name : ""}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <Button onClick={handleSubmit(handlePostOrder)} name="Nu chto pognali" type="submit" />
                </form>
            )}
        </section>
    );
};

export default OrderPage;
