import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ModelCard from "./ModelCard/ModelCard.jsx";
import Radio from "../../Common/UI/Radio/Radio.jsx";
import { apiAction, fetchCars, fetchCategories, resetApiCarExtra } from "../../../store/slices/apiSlice";
import { formAction, resetExtra } from "../../../store/slices/formSlice";
import { validityAction } from "../../../store/slices/validationSlice";
import useModal from "../../../hooks/useModal";
import useCheckboxFilter from "../../../hooks/useCheckboxFilter";
import styles from "./ModelStep.module.scss";
import Preloader from "../../Common/UI/Preloader/Preloader.jsx";

const ModelStep = () => {
    const dispatch = useDispatch();
    const [isOpened, toggle] = useModal();
    const apiData = useSelector((state) => state.api);
    const formData = useSelector((state) => state.form);
    const [checked, check] = useCheckboxFilter();
    const [pickedCar, setPickedCar] = useState({ car: apiData.selectedCar });

    const hadleCardClick = (car) => {
        dispatch(apiAction({ selectedCar: car }));
        dispatch(formAction({ car: { name: car.name, id: car.id } }));
        dispatch(resetExtra());
        dispatch(resetApiCarExtra());
        setPickedCar({ ...pickedCar, car });
        if (!isOpened) {
            toggle();
        }
    };

    const handleCheck = (value) => {
        check(value);
    };

    useEffect(() => {
        if (apiData.cars.status === "idle") {
            dispatch(fetchCars());
        }
    }, [apiData.cars.status]);

    useEffect(() => {
        if (apiData.categories.status === "idle") {
            dispatch(fetchCategories());
        }
    }, [apiData.categories.status]);

    useEffect(() => {
        if (!formData.car.name) {
            dispatch(validityAction({ modelValid: false }));
            dispatch(validityAction({ extraValid: false }));
        } else {
            dispatch(validityAction({ modelValid: true }));
            dispatch(validityAction({ extraValid: true }));
        }
    }, [formData.car.name]);

    return (
        <form className={styles.modelForm}>
            {
                // eslint-disable-next-line no-nested-ternary
                apiData.cars.data.length > 0 ? (
                    <div className={styles.modelFormList}>
                        <div className={styles.checkboxContainer}>
                            <div className={styles.box}>
                                {apiData.categories.data.map((category) => (
                                    <Radio
                                        key={category.id}
                                        value={category.name}
                                        name={category.name}
                                        checked={checked}
                                        onChange={handleCheck}
                                        item={category}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className={styles.modelContainer}>
                            {apiData.filteredCars.length !== 0
                                ? apiData.filteredCars.map((car) => (
                                      <ModelCard
                                          onClick={hadleCardClick}
                                          key={car.id}
                                          car={car}
                                          pickedCar={pickedCar}
                                      />
                                  ))
                                : apiData.cars.data.map((car) => (
                                      <ModelCard
                                          onClick={hadleCardClick}
                                          key={car.id}
                                          car={car}
                                          pickedCar={pickedCar}
                                      />
                                  ))}
                        </div>
                    </div>
                ) : apiData.cars.status === "loading" ? (
                    <Preloader />
                ) : (
                    <div className={styles.textMessage}>По данному адресу нет доступных авто</div>
                )
            }
        </form>
    );
};

export default ModelStep;
