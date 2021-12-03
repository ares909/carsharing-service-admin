import React, { useEffect, useState, useRef } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import orderValidationSchema from "../../../validation/orderValidation";

import { resetPopupMessage } from "../../../store/slices/apiSlice";
import {
    fetchCities,
    fetchOrder,
    fetchStatuses,
    fetchCars,
    fetchRates,
    postOrder,
    fetchAllOrders,
} from "../../../store/actions/apiActions";
import { apiData } from "../../../store/selectors/selectors";
import Button from "../../Common/UI/Button.jsx";
import SuccessPopup from "../../Common/UI/SuccessPopup/SuccessPopup.jsx";
import Preloader from "../../Common/UI/Preloader/Preloader.jsx";
import Checkbox from "../../Common/UI/Checkbox/Checkbox.jsx";
import OrderInput from "./OrderInput/OrderInput.jsx";
import OrderImageBlock from "../OrderList/OrderCard/OrderImageBlock/OrderImageBlock.jsx";
import useModal from "../../../hooks/useModal";
import useMapper from "../../../hooks/useMapper";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { imageUrl, pageSize } from "../../../constants/constants";
import { messages } from "../../../constants/messages";
import { textOptions, inputArray } from "../../../constants/orderConstants";
import styles from "./OrderPage.module.scss";

const OrderPage = () => {
    const popupMessageRef = useRef(null);
    const { orderId } = useParams();
    const token = JSON.parse(localStorage.getItem("access_token"));
    const dispatch = useDispatch();
    const { push, goBack } = useHistory();
    const { statuses, singleOrder, status, cars, rates, cities, order, points, orderPrice, apiFilters } =
        useSelector(apiData);
    const [defaultValues, setDefaultValues] = useState({ city: "", address: "" });
    const [isPopupOpened, togglePopup] = useModal();
    const [popupMessage, setPopupMessage] = useState("");
    const {
        getValues,
        handleSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm({
        defaultValues,
        resolver: yupResolver(orderValidationSchema),
        mode: "onSubmit",
    });

    const mapObject = useMapper();

    useOnClickOutside(popupMessageRef, () => {
        if (isPopupOpened) {
            togglePopup();
            dispatch(resetPopupMessage());
        }
    });

    useEffect(() => {
        if (orderId) {
            dispatch(fetchOrder(orderId));
        }
    }, [orderId]);

    useEffect(() => {
        if (order.status === "succeeded") {
            const values = mapObject({ dataType: "orderDefaultValues", data: order.data });
            setDefaultValues({ ...defaultValues, ...values });
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

    const handlePostOrder = (data) => {
        const values = mapObject({ dataType: "order", data });
        dispatch(
            postOrder({
                orderId,
                order: {
                    ...values,
                },
            }),
        );
    };

    return (
        <section className={styles.orderPage}>
            <SuccessPopup
                isPopupOpened={isPopupOpened}
                togglePopup={togglePopup}
                popupMessage={popupMessage}
                innerRef={popupMessageRef}
            />
            {singleOrder.status === "loading" && status !== "rejected" && <Preloader />}
            {cars.status === "loading" && status !== "rejected" && <Preloader />}
            {order.status === "loading" && status !== "rejected" && <Preloader />}
            {order.status === "succeeded" && (
                <form className={styles.orderBox}>
                    <div className={styles.orderDataBox}>
                        <h2 className={styles.orderTitle}>
                            Заказ № <span className={styles.orderTitleTextBold}>{order.data.id}</span>
                        </h2>
                        <div className={styles.orderData}>
                            <OrderImageBlock
                                className={styles.cardImage}
                                data={
                                    // eslint-disable-next-line no-nested-ternary
                                    order.data.carId
                                        ? order.data.carId.thumbnail.path.includes("files")
                                            ? imageUrl + order.data.carId.thumbnail.path
                                            : order.data.carId.thumbnail.path
                                        : ""
                                }
                            />

                            <div className={styles.orderInfo}>
                                {textOptions(order).map((item) => (
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
                            {inputArray({
                                cities,
                                points,
                                cars,
                                order,
                                rates,
                                statuses,
                            }).map((item) => (
                                <Controller
                                    name={item.name}
                                    control={control}
                                    key={item.id}
                                    // defaultValue={defaultValues.category}
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
