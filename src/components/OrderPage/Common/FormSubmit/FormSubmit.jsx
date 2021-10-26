import React from "react";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import { useHistory, useLocation } from "react-router";

import useNumberFormat from "../../../../hooks/useNumberFormat";
import Button from "../../../Common/UI/Button.jsx";
import crossButtoBlack from "../../../Common/UI/CrossButton/CrossButtonBlack.jsx";
import OrderContainer from "../OrderContainer/OrderContainer.jsx";
import PriceContainer from "../PriceContainer/PriceContainer.jsx";
import useModal from "../../../../hooks/useModal";
import styles from "./FormSubmit.module.scss";
import Confirmation from "../../TotalStep/Confirmation/Confirmarion.jsx";
import { fetchOrder } from "../../../../store/slices/apiSlice";

const FormSubmit = ({ isOpened, toggle }) => {
    const dispatch = useDispatch();
    const { convertNumber } = useNumberFormat();
    const location = useLocation();
    const [confOpened, toggleConf] = useModal();
    const { push } = useHistory();
    const apiData = useSelector((state) => state.api);
    const formData = useSelector((state) => state.form);
    const validationState = useSelector((state) => state.validation);

    let buttonName;
    let formName;
    let address;
    let handleSubmit;
    switch (location.pathname) {
        case "/order/model":
            buttonName = "Дополнительно";
            formName = "modelValid";
            address = "/order/extra";
            handleSubmit = () => {
                push(address);
            };

            break;

        case "/order/extra":
            buttonName = "Итого";
            formName = "extraValid";
            address = "/order/total";
            handleSubmit = () => {
                push(address);
            };
            break;

        case "/order/total":
            buttonName = "Заказать";
            formName = "totalValid";
            address = `/order/${apiData.order.orderId}`;
            handleSubmit = () => {
                toggleConf();
            };
            break;

        case `/order/${apiData.order.orderId}`:
            buttonName = "Отменить";
            formName = "totalValid";
            address = "/order/total";
            break;

        default:
            buttonName = "Выбрать модель";
            formName = "locationValid";
            address = "/order/model";
            handleSubmit = () => {
                push(address);
            };
            break;
    }

    const buttonClassName = classNames({
        [`${styles.formButton}`]: true,
        [`${styles.formButtonDisabled}`]: !validationState[formName],
    });

    const className = classNames({
        [`${styles.submitContainer}`]: true,
        [`${styles.submitMobile}`]: true,
        [`${styles.submitMobileActive}`]: isOpened,
    });

    const handleNewOrder = () => {
        dispatch(
            fetchOrder({
                orderStatusId: apiData.statuses.data[0],
                cityId: formData.city.id,
                pointId: formData.point.id,
                carId: formData.selectedCar.id,
                color: formData.formColor,
                dateFrom: formData.formLength.timeSecStart,
                dateTo: formData.formLength.timeSecEnd,
                rateId: formData.formRate.id,
                price: formData.price,
                isFullTank: formData.isFullTank.value,
                isNeedChildChair: formData.isNeedChildChair.value,
                isRightWheel: formData.isRightWheel.value,
            }),
        );
    };

    // const handleSubmit = () => {
    //     push(address);
    // };

    return (
        formData.city &&
        formData.point && (
            <div className={className}>
                <Button type="button" toggle={toggle} className={styles.crossButton}>
                    {crossButtoBlack}
                </Button>
                <h3 className={styles.submitContainerHeader}>Ваш заказ:</h3>
                <div className={styles.orderStatusBox}>
                    <OrderContainer name="Пункт выдачи" data={`${formData.city.name}, \n ${formData.point.name}`} />
                    <OrderContainer name="Модель" data={`${formData.car.name}`} />
                    <OrderContainer name="Цвет" data={apiData.colors.length > 1 ? `${formData.formColor}` : ""} />
                    <OrderContainer name="Длительность аренды" data={`${formData.formLength.timeDate}`} />
                    <OrderContainer name="Тариф" data={`${formData.formRate.name}`} />
                    <OrderContainer
                        name="Полный бак"
                        data={formData.isFullTank.value === "true" ? `${formData.isFullTank.form}` : ""}
                    />
                    <OrderContainer
                        name="Детское кресло"
                        data={formData.isNeedChildChair.value === "true" ? `${formData.isNeedChildChair.form}` : ""}
                    />
                    <OrderContainer
                        name="Правый руль"
                        data={formData.isRightWheel.value === "true" ? `${formData.isRightWheel.form}` : ""}
                    />
                </div>
                <PriceContainer price={formData.price !== 0 && `${convertNumber(formData.price)} ₽`} />
                <Confirmation isOpened={confOpened} toggle={toggleConf} address={address} onSubmit={handleNewOrder} />

                <Button
                    disabled={!validationState[formName]}
                    className={buttonClassName}
                    type="button"
                    name={buttonName}
                    onClick={handleSubmit}
                />
            </div>
        )
    );
};

export default FormSubmit;
