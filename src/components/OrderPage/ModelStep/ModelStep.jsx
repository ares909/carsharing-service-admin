import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import FormSubmit from "../Common/FormSubmit/FormSubmit.jsx";
import OrderContainer from "../Common/OrderContainer/OrderContainer.jsx";
import useNumberFormat from "../../../hooks/useNumberFormat";
import { imageUrl } from "../../../constants/constants";
import { formAction } from "../../../store/slices/formSlice";
import styles from "./ModelStep.module.scss";
import ModelCard from "./ModelCard/ModelCard.jsx";
import { fetchCar } from "../../../store/slices/carSlice";

const ModelStep = () => {
    const dispatch = useDispatch();
    const stateForm = useSelector((state) => state.form);
    const cars = useSelector((state) => state.priceRange.cars);
    const selectedCar = useSelector((state) => state.car.car);
    const { handleSubmit, errors, register } = useForm({
        // defaultValues: stateForm,
    });
    const { push } = useHistory();
    const location = {
        pathname: "/order/extra",
    };
    const { convertNumber } = useNumberFormat();
    const priceRange = selectedCar
        ? `от ${convertNumber(selectedCar.priceMin)} до ${convertNumber(selectedCar.priceMax)} ₽`
        : `Выберите авто`;

    const onSubmit = (data) => {
        // dispatch(formAction(data));
        push(location);
        console.log(data);
        // console.log(cityId);
    };

    const hadleCardClick = (car) => {
        // e.preventDefault();
        dispatch(formAction({ car: car.name }));
        dispatch(fetchCar(car.id));
        console.log(car);
    };

    return (
        <form className={styles.modelForm} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.modelContainer}>
                {cars.map((car) => (
                    <ModelCard onClick={hadleCardClick} key={car.id} car={car.carId} />
                ))}
            </div>

            <FormSubmit
                price={priceRange}
                onSubmit={onSubmit}
                buttonName="Дополнительно"
                buttonClassName={classNames({
                    [`${styles.formButton}`]: true,
                    [`${styles.formButtonDisabled}`]: !stateForm.modelValid,
                })}
            >
                <OrderContainer name="Пункт выдачи" data={`${stateForm.city}, \n ${stateForm.point}`} />
                <OrderContainer name="Модель" data={`${stateForm.car}` || `Выберите модель`} />
            </FormSubmit>
        </form>
    );
};

export default ModelStep;
