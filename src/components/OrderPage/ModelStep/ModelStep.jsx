import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import FormSubmit from "../Common/FormSubmit/FormSubmit.jsx";
import OrderContainer from "../Common/OrderContainer/OrderContainer.jsx";
import ModelCard from "./ModelCard/ModelCard.jsx";
import Checkbox from "../../Common/UI/Checkbox/Checkbox.jsx";
import PriceContainer from "../Common/PriceContainer/PriceContainer.jsx";
import useNumberFormat from "../../../hooks/useNumberFormat";
import { formAction, fetchCar, fetchOrder } from "../../../store/slices/formSlice";
import useModal from "../../../hooks/useModal";
import useCheckboxFilter from "../../../hooks/useCheckboxFilter";
import styles from "./ModelStep.module.scss";

const ModelStep = () => {
    const dispatch = useDispatch();
    const [isOpened, toggle] = useModal();
    const stateForm = useSelector((state) => state.form);
    const cars = useSelector((state) => state.form.order.cars);
    const filteredCars = useSelector((state) => state.form.filteredCars);
    const categories = useSelector((state) => state.form.order.categories);
    const city = useSelector((state) => state.form.city);
    const point = useSelector((state) => state.form.point);
    const selectedCar = useSelector((state) => state.form.selectedCar);
    const [checked, check] = useCheckboxFilter();
    const [pickedCar, setPickedCar] = useState({ car: selectedCar });
    const orderStatus = useSelector((state) => state.form.order.status);
    const order = useSelector((state) => state.form.order.data);
    const buttonClassName = classNames({
        [`${styles.formButton}`]: true,
        [`${styles.formButtonDisabled}`]: !stateForm.modelValid,
    });

    const { push } = useHistory();
    const location = {
        pathname: "/order/extra",
    };
    const { convertNumber } = useNumberFormat();

    const onSubmit = () => {
        push(location);
    };

    const hadleCardClick = (car) => {
        dispatch(fetchCar(car.id));
        setPickedCar({ ...pickedCar, car });
        if (!isOpened) {
            toggle();
        }
    };

    const handleCheck = (value) => {
        check(value);
    };

    useEffect(() => {
        if (orderStatus === "idle") {
            dispatch(fetchOrder({ cityId: city.id, pointId: point.id }));
        }
    }, [orderStatus]);

    useEffect(() => {
        if (!selectedCar.name) {
            dispatch(formAction({ modelValid: false }));
            dispatch(formAction({ extraValid: false }));
        } else {
            dispatch(formAction({ modelValid: true }));
            dispatch(formAction({ extraValid: true }));
        }
    }, [selectedCar.name]);

    return (
        <form className={styles.modelForm}>
            {
                // eslint-disable-next-line no-nested-ternary
                cars.length > 0 ? (
                    <div className={styles.modelFormList}>
                        <div className={styles.checkboxContainer}>
                            <div className={styles.box}>
                                {categories.map((category) => (
                                    <Checkbox
                                        key={category.id}
                                        value={category.name}
                                        name={category.name}
                                        checked={checked}
                                        onChange={handleCheck}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className={styles.modelContainer}>
                            {filteredCars.length !== 0
                                ? filteredCars.map((car) => (
                                      <ModelCard
                                          onClick={hadleCardClick}
                                          key={car.id}
                                          car={car}
                                          pickedCar={pickedCar}
                                      />
                                  ))
                                : cars.map((car) => (
                                      <ModelCard
                                          onClick={hadleCardClick}
                                          key={car.id}
                                          car={car}
                                          pickedCar={pickedCar}
                                      />
                                  ))}
                        </div>
                    </div>
                ) : orderStatus === "loading" ? (
                    <div className={styles.textMessage}>...Загрузка</div>
                ) : (
                    <div className={styles.textMessage}>По данному адресу нет доступных авто</div>
                )
            }

            <FormSubmit
                onSubmit={onSubmit}
                buttonClassName={buttonClassName}
                buttonName="Дополнительно"
                isDisabled={!stateForm.modelValid}
                isOpened={isOpened}
                toggle={toggle}
            >
                <div className={styles.orderStatusBox}>
                    <OrderContainer name="Пункт выдачи" data={`${city.name}, \n ${point.name}`} />
                    <OrderContainer name="Модель" data={`${selectedCar.name}`} />
                </div>
                <PriceContainer
                    price={
                        selectedCar
                            ? `от ${convertNumber(selectedCar.priceMin)} до ${convertNumber(selectedCar.priceMax)} ₽`
                            : ""
                    }
                />
            </FormSubmit>
        </form>
    );
};

export default ModelStep;
