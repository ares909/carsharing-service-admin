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
import Confirmation from "../../TotalStep/Confirmation/Confirmarion.jsx";
import { apiData, formData, validationState } from "../../../../store/selectors/selectors";
import { postOrder, changeOrder, cancelOrder, resetApiData } from "../../../../store/slices/apiSlice";
import { resetExtra, resetForm } from "../../../../store/slices/formSlice";
import useModal from "../../../../hooks/useModal";
import styles from "./FormSubmit.module.scss";

const FormSubmit = ({ isFormOpened, openForm }) => {
    const dispatch = useDispatch();
    const { statuses, selectedCar, order, colors } = useSelector(apiData);
    const { formLength, isFullTank, isRightWheel, isNeedChildChair, city, point, formRate, car, price, formColor } =
        useSelector(formData);

    const formValidation = useSelector(validationState);

    const [convertNumber, convertCarNumber] = useNumberFormat();
    const [convertDateToSeconds, secondsToDhms, secondsToMinutes, secondsToHours, stringToLocale, secondsToDays] =
        useDateFormat();
    const location = useLocation();
    const [confOpened, toggleConf] = useModal();
    const { push } = useHistory();

    const url = `/order/confirmed/${order.orderId}`;
    const handleNewOrder = () => {
        dispatch(
            postOrder({
                orderStatusId: statuses.data[0].id,
                cityId: city.id,
                pointId: point.id,
                carId: car.id,
                color: formColor,
                dateFrom: formLength.timeSecStart,
                dateTo: formLength.timeSecEnd,
                rateId: formRate.id,
                price,
                isFullTank: isFullTank.value,
                isNeedChildChair: isNeedChildChair.value,
                isRightWheel: isRightWheel.value,
            }),
        );
    };

    const handleConfirmOrder = () => {
        dispatch(changeOrder({ id: order.orderId, statusId: statuses.data[1].id }));
    };
    const handleCancelOrder = () => {
        dispatch(cancelOrder({ id: order.orderId, statusId: statuses.data[2].id }));
        dispatch(resetApiData());
        dispatch(resetForm());
    };
    let buttonName;
    let formName;
    let address;
    let handleSubmit;
    let formPrice;
    switch (location.pathname) {
        case "/order/model":
            buttonName = "Дополнительно";
            formName = "modelValid";
            address = "/order/extra";
            handleSubmit = () => {
                push(address);
                openForm();
            };
            // eslint-disable-next-line no-nested-ternary
            formPrice = price
                ? `${convertNumber(price)} ₽`
                : selectedCar
                ? `от ${convertNumber(selectedCar.priceMin)} до  ${convertNumber(selectedCar.priceMax)} ₽`
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
            formPrice = price ? `${convertNumber(price)} ₽` : "";
            break;

        case "/order/total":
            buttonName = "Заказать";
            formName = "totalValid";
            address = `/order/confirmed/${order.orderId}`;
            handleSubmit = () => {
                handleNewOrder();
                toggleConf();
            };
            formPrice = price ? `${convertNumber(price)} ₽` : "";
            break;

        case url:
            buttonName = "Отменить";
            formName = "totalValid";
            address = "/order";
            handleSubmit = () => {
                handleCancelOrder();
                push(address);
            };
            formPrice = order.data.price ? `${convertNumber(order.data.price)} ₽` : "";
            break;

        default:
            buttonName = "Выбрать модель";
            formName = "locationValid";
            address = "/order/model";
            handleSubmit = () => {
                push(address);
                openForm();
            };
            // eslint-disable-next-line no-nested-ternary
            formPrice = price
                ? `${convertNumber(price)} ₽`
                : selectedCar
                ? `от ${convertNumber(selectedCar.priceMin)} до  ${convertNumber(selectedCar.priceMax)} ₽`
                : "";

            break;
    }

    const buttonClassName = classNames({
        [`${styles.formButton}`]: true,
        [`${styles.formButtonRed}`]: location.pathname === `/order/confirmed/${order.orderId}`,
        [`${styles.formButtonDisabled}`]: !formValidation[formName],
    });

    const className = classNames({
        [`${styles.submitContainer}`]: true,
        [`${styles.submitMobile}`]: true,
        [`${styles.submitMobileActive}`]: isFormOpened,
    });

    if (location.pathname !== url) {
        return (
            city &&
            point && (
                <div className={className}>
                    <Button type="button" toggle={openForm} className={styles.crossButton}>
                        {crossButtoBlack}
                    </Button>
                    <h3 className={styles.submitContainerHeader}>Ваш заказ:</h3>
                    <div className={styles.orderStatusBox}>
                        <OrderContainer name="Пункт выдачи" data={`${city.name}, \n ${point.name}`} />
                        <OrderContainer name="Модель" data={car.name ? `${car.name}` : ""} />
                        <OrderContainer name="Цвет" data={colors.length > 1 ? `${formColor}` : ""} />
                        <OrderContainer
                            name="Длительность аренды"
                            data={formLength.timeDate ? `${formLength.timeDate}` : ""}
                        />
                        <OrderContainer name="Тариф" data={formRate.name ? `${formRate.name}` : ""} />
                        <OrderContainer
                            name="Полный бак"
                            data={isFullTank.value === true ? `${isFullTank.form}` : ""}
                        />
                        <OrderContainer
                            name="Детское кресло"
                            data={isNeedChildChair.value === true ? `${isNeedChildChair.form}` : ""}
                        />
                        <OrderContainer
                            name="Правый руль"
                            data={isRightWheel.value === true ? `${isRightWheel.form}` : ""}
                        />
                    </div>
                    <PriceContainer price={formPrice} />
                    <Confirmation
                        isOpened={confOpened}
                        toggle={toggleConf}
                        address={address}
                        onSubmit={handleConfirmOrder}
                    />

                    <Button
                        disabled={!formValidation[formName]}
                        className={buttonClassName}
                        type="button"
                        name={buttonName}
                        onClick={handleSubmit}
                    />
                </div>
            )
        );
    }

    return order.data.carId ? (
        <div className={className}>
            <Button type="button" toggle={openForm} className={styles.crossButton}>
                {crossButtoBlack}
            </Button>
            <h3 className={styles.submitContainerHeader}>Ваш заказ:</h3>
            <div className={styles.orderStatusBox}>
                <OrderContainer
                    name="Пункт выдачи"
                    data={`${order.data.cityId.name}, \n ${order.data.pointId.address}`}
                />
                <OrderContainer name="Модель" data={`${order.data.carId.name}`} />
                <OrderContainer name="Цвет" data={`${order.data.color}`} />
                <OrderContainer
                    name="Длительность аренды"
                    data={`${secondsToDhms(order.data.dateTo - order.data.dateFrom)}`}
                />
                <OrderContainer name="Тариф" data={`${order.data.rateId.rateTypeId.name}`} />
                <OrderContainer name="Полный бак" data={order.data.isFullTank === true ? "Да" : ""} />
                <OrderContainer name="Детское кресло" data={order.data.isNeedChildChair === true ? "Да" : ""} />
                <OrderContainer name="Правый руль" data={order.data.isRightWheel === true ? "Да" : ""} />
            </div>
            <PriceContainer price={`${convertNumber(order.data.price)} ₽`} car={selectedCar} />

            <Button
                disabled={!formValidation[formName]}
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
