import React from "react";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import { useHistory, useLocation, useParams } from "react-router";

import useNumberFormat from "../../../../hooks/useNumberFormat";
import useDateFormat from "../../../../hooks/useDateFormat";
import Button from "../../../Common/UI/Button.jsx";
import crossButtoBlack from "../../../Common/UI/CrossButton/CrossButtonBlack.jsx";
import OrderContainer from "../OrderContainer/OrderContainer.jsx";
import PriceContainer from "../PriceContainer/PriceContainer.jsx";
import useModal from "../../../../hooks/useModal";
import styles from "./FormSubmit.module.scss";
import Confirmation from "../../TotalStep/Confirmation/Confirmarion.jsx";
import { postOrder, changeOrder, cancelOrder, resetApiData } from "../../../../store/slices/apiSlice";
import { resetExtra, resetForm } from "../../../../store/slices/formSlice";

const FormSubmit = ({ isFormOpened, openForm }) => {
    const dispatch = useDispatch();
    const [convertNumber, convertCarNumber] = useNumberFormat();
    const [convertDateToSeconds, secondsToDhms, secondsToMinutes, secondsToHours, stringToLocale] = useDateFormat();
    const location = useLocation();
    const [confOpened, toggleConf] = useModal();
    const { push } = useHistory();

    const apiData = useSelector((state) => state.api);
    const url = `/order/confirmed/${apiData.order.orderId}`;
    const formData = useSelector((state) => state.form);
    const validationState = useSelector((state) => state.validation);
    const handleNewOrder = () => {
        dispatch(
            postOrder({
                orderStatusId: apiData.statuses.data[0].id,
                cityId: formData.city.id,
                pointId: formData.point.id,
                carId: formData.car.id,
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

    const handleConfirmOrder = () => {
        dispatch(changeOrder({ id: apiData.order.orderId, statusId: apiData.statuses.data[1].id }));
    };
    const handleCancelOrder = () => {
        dispatch(cancelOrder({ id: apiData.order.orderId, statusId: apiData.statuses.data[2].id }));
        dispatch(resetApiData());
        dispatch(resetForm());
    };
    let buttonName;
    let formName;
    let address;
    let handleSubmit;
    let price;
    switch (location.pathname) {
        case "/order/model":
            buttonName = "Дополнительно";
            formName = "modelValid";
            address = "/order/extra";
            handleSubmit = () => {
                push(address);
                openForm();
            };
            price = apiData.selectedCar
                ? `от ${convertNumber(apiData.selectedCar.priceMin)} до  ${convertNumber(
                      apiData.selectedCar.priceMax,
                  )} ₽`
                : "";

            break;

        case "/order/extra":
            buttonName = "Итого";
            formName = "extraValid";
            address = "/order/total";
            handleSubmit = () => {
                push(address);
                openForm();
            };
            price = formData.price ? `${convertNumber(formData.price)} ₽` : "";
            break;

        case "/order/total":
            buttonName = "Заказать";
            formName = "totalValid";
            address = `/order/confirmed/${apiData.order.orderId}`;
            handleSubmit = () => {
                handleNewOrder();
                toggleConf();
            };
            price = formData.price ? `${convertNumber(formData.price)} ₽` : "";
            break;

        case url:
            buttonName = "Отменить";
            formName = "totalValid";
            address = "/order";
            handleSubmit = () => {
                handleCancelOrder();
                push(address);

                // dispatch(resetd)
                // toggleConf();
            };
            price = apiData.order.data.price ? `${convertNumber(apiData.order.data.price)} ₽` : "";
            break;

        default:
            buttonName = "Выбрать модель";
            formName = "locationValid";
            address = "/order/model";
            handleSubmit = () => {
                push(address);
                openForm();
            };
            price = apiData.selectedCar
                ? `от ${convertNumber(apiData.selectedCar.priceMin)} до  ${convertNumber(
                      apiData.selectedCar.priceMax,
                  )} ₽`
                : "";

            break;
    }

    const buttonClassName = classNames({
        [`${styles.formButton}`]: true,
        [`${styles.formButtonRed}`]: location.pathname === `/order/confirmed/${apiData.order.orderId}`,
        [`${styles.formButtonDisabled}`]: !validationState[formName],
    });

    const className = classNames({
        [`${styles.submitContainer}`]: true,
        [`${styles.submitMobile}`]: true,
        [`${styles.submitMobileActive}`]: isFormOpened,
    });

    if (location.pathname !== url) {
        return (
            formData.city &&
            formData.point && (
                <div className={className}>
                    <Button type="button" toggle={openForm} className={styles.crossButton}>
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
                            data={formData.isFullTank.value === true ? `${formData.isFullTank.form}` : ""}
                        />
                        <OrderContainer
                            name="Детское кресло"
                            data={formData.isNeedChildChair.value === true ? `${formData.isNeedChildChair.form}` : ""}
                        />
                        <OrderContainer
                            name="Правый руль"
                            data={formData.isRightWheel.value === true ? `${formData.isRightWheel.form}` : ""}
                        />
                    </div>
                    <PriceContainer price={price} />
                    <Confirmation
                        isOpened={confOpened}
                        toggle={toggleConf}
                        address={address}
                        onSubmit={handleConfirmOrder}
                    />

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
    }

    return apiData.order.data.carId ? (
        <div className={className}>
            <Button type="button" toggle={openForm} className={styles.crossButton}>
                {crossButtoBlack}
            </Button>
            <h3 className={styles.submitContainerHeader}>Ваш заказ:</h3>
            <div className={styles.orderStatusBox}>
                <OrderContainer
                    name="Пункт выдачи"
                    data={`${apiData.order.data.cityId.name}, \n ${apiData.order.data.pointId.address}`}
                />
                <OrderContainer name="Модель" data={`${apiData.order.data.carId.name}`} />
                <OrderContainer name="Цвет" data={`${apiData.order.data.color}`} />
                <OrderContainer
                    name="Длительность аренды"
                    data={`${secondsToDhms(apiData.order.data.dateTo - apiData.order.data.dateFrom)}`}
                />
                <OrderContainer name="Тариф" data={`${apiData.order.data.rateId.rateTypeId.name}`} />
                <OrderContainer name="Полный бак" data={apiData.order.data.isFullTank === true ? "Да" : ""} />
                <OrderContainer name="Детское кресло" data={apiData.order.data.isNeedChildChair === true ? "Да" : ""} />
                <OrderContainer name="Правый руль" data={apiData.order.data.isRightWheel === true ? "Да" : ""} />
            </div>
            <PriceContainer price={`${convertNumber(apiData.order.data.price)} ₽`} />

            <Button
                disabled={!validationState[formName]}
                className={buttonClassName}
                type="button"
                name={buttonName}
                onClick={handleSubmit}
            />
        </div>
    ) : (
        <></>
    );
};

export default FormSubmit;
