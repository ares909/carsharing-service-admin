import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import classNames from "classnames";

import FormSubmit from "../Common/FormSubmit/FormSubmit.jsx";
import OrderContainer from "../Common/OrderContainer/OrderContainer.jsx";
import Radio from "../../Common/UI/Radio/Radio.jsx";
import Checkbox from "../../Common/UI/Checkbox/Checkbox.jsx";
import PriceContainer from "../Common/PriceContainer/PriceContainer.jsx";

import Button from "../../Common/UI/Button.jsx";
import { formAction } from "../../../store/slices/formSlice";
import { resetFilteredCars, filterOrder, apiAction, fetchRates, fetchStatuses } from "../../../store/slices/apiSlice";
import useNumberFormat from "../../../hooks/useNumberFormat";
import useModal from "../../../hooks/useModal";
import useCheckboxFilter from "../../../hooks/useCheckboxFilter";
import { imageUrl } from "../../../constants/constants";
import styles from "./TotalStep.module.scss";
import Confirmation from "./Confirmation/Confirmarion.jsx";

const TotalStep = () => {
    const dispatch = useDispatch();
    const [isOpened, toggle] = useModal();
    const { convertNumber } = useNumberFormat();
    const stateForm = useSelector((state) => state.form);
    const colors = useSelector((state) => state.form.colors);
    const city = useSelector((state) => state.form.city);
    const point = useSelector((state) => state.form.point);
    const selectedCar = useSelector((state) => state.form.selectedCar);
    const isFullTank = useSelector((state) => state.form.isFullTank);
    const isNeedChildChair = useSelector((state) => state.form.isNeedChildChair);
    const isRightWheel = useSelector((state) => state.form.isRightWheel);
    const formColor = useSelector((state) => state.form.formColor);
    const formRate = useSelector((state) => state.form.formRate);
    const price = useSelector((state) => Number(state.form.price));
    const [checked, check, carColor, changeColor, changeRate, checkWheel, checkChair, checkTank] = useCheckboxFilter();
    const rates = useSelector((state) => state.form.rates.data);
    const rateStatus = useSelector((state) => state.form.rates.status);
    const orderStatus = useSelector((state) => state.form.statuses.status);
    const formLength = useSelector((state) => state.form.formLength);
    const newOrderStatus = useSelector((state) => state.form.statuses.data[0]);
    const validationState = useSelector((state) => state.validation);
    const buttonClassName = classNames({
        [`${styles.formButton}`]: true,
        [`${styles.formButtonDisabled}`]: !validationState.extraValid,
    });

    const tank = isFullTank.value === "true" ? 100 : selectedCar.tank;
    const date = formLength.start
        ? formLength.start.toLocaleString("ru-RU", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "numeric",
              minute: "2-digit",
          })
        : "";

    const { push } = useHistory();

    const location = {
        pathname: "/order/total",
    };
    const onSubmit = () => {
        if (!isOpened) {
            toggle();
        }
    };

    const handleModalClick = () => {
        if (!isOpened) {
            toggle();
        }
    };
    useEffect(() => {
        if (orderStatus === "idle") {
            dispatch(fetchStatuses());
        }
    }, [orderStatus]);

    useEffect(() => {
        dispatch(resetFilteredCars());
    }, []);

    return (
        <form className={styles.totalForm}>
            <div className={styles.totalContainer}>
                <div>
                    <h2>{selectedCar.name}</h2>
                    <div>{selectedCar.number}</div>
                    <p>
                        {` Топливо
                        ${tank}%`}
                    </p>
                    <p>
                        Доступна с <span>{date}</span>
                    </p>
                    <div>
                        <img
                            src={
                                selectedCar.thumbnail.path.includes("files")
                                    ? imageUrl + selectedCar.thumbnail.path
                                    : selectedCar.thumbnail.path
                            }
                        />
                    </div>
                </div>
            </div>

            <Button name="Ваши параметры" type="button" className={styles.modalButton} onClick={handleModalClick} />
        </form>
    );
};

export default TotalStep;
