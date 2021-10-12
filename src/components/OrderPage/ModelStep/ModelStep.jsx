import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import FormSubmit from "../Common/FormSubmit/FormSubmit.jsx";
import OrderContainer from "../Common/OrderContainer/OrderContainer.jsx";
import useNumberFormat from "../../../hooks/useNumberFormat";
import { imageUrl } from "../../../constants/constants";
import { formAction, fetchCar, resetSelectedCar } from "../../../store/slices/formSlice";
import useCheckboxFilter from "../../../hooks/useCheckboxFilter";
import styles from "./ModelStep.module.scss";
import ModelCard from "./ModelCard/ModelCard.jsx";
import Checkbox from "../../Common/UI/Checkbox.jsx";

const ModelStep = () => {
    const dispatch = useDispatch();
    const stateForm = useSelector((state) => state.form);
    const cars = useSelector((state) => state.form.cars);
    const filteredCars = useSelector((state) => state.form.filteredCars);
    const categories = useSelector((state) => state.form.categories);
    const carInput = useSelector((state) => state.form.car);
    const city = useSelector((state) => state.form.city);
    const point = useSelector((state) => state.form.point);
    const selectedCar = useSelector((state) => state.form.selectedCar);
    const [checked, check] = useCheckboxFilter();

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
        dispatch(formAction({ car: car.name }));
        dispatch(fetchCar(car.id));
        console.log(car);
    };

    const handleCheck = (value) => {
        check(value);
    };

    useEffect(() => {
        if (!selectedCar.name) {
            dispatch(formAction({ modelValid: false }));
        } else {
            dispatch(formAction({ modelValid: true }));
        }
    }, [selectedCar.name]);

    return (
        <form className={styles.modelForm} onSubmit={handleSubmit(onSubmit)}>
            {cars.length > 0 ? (
                <>
                    <div className={styles.checkboxContainer}>
                        <Checkbox value="Все модели" name="Все модели" checked={checked} onChange={handleCheck} />
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
                    <div className={styles.modelContainer}>
                        {filteredCars.length !== 0
                            ? filteredCars.map((car) => <ModelCard onClick={hadleCardClick} key={car.id} car={car} />)
                            : cars.map((car) => <ModelCard onClick={hadleCardClick} key={car.id} car={car} />)}
                    </div>
                </>
            ) : (
                <div>По данному адресу нет доступных авто</div>
            )}

            <FormSubmit
                price={priceRange}
                onSubmit={onSubmit}
                buttonName="Дополнительно"
                buttonClassName={classNames({
                    [`${styles.formButton}`]: true,
                    [`${styles.formButtonDisabled}`]: !stateForm.modelValid,
                })}
                isDisabled={!stateForm.modelValid}
            >
                <OrderContainer name="Пункт выдачи" data={`${city.name}, \n ${point.name}`} />
                <OrderContainer name="Модель" data={`${selectedCar.name}`} />
            </FormSubmit>
        </form>
    );
};

export default ModelStep;
