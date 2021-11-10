import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import ModelCard from "./ModelCard/ModelCard.jsx";
import Radio from "../../Common/UI/Radio/Radio.jsx";
import Preloader from "../../Common/UI/Preloader/Preloader.jsx";
import { apiData, formData, validationState } from "../../../store/selectors/selectors";
import { apiAction, fetchCars, fetchCategories, resetApiCarExtra } from "../../../store/slices/apiSlice";
import { formAction, resetExtra } from "../../../store/slices/formSlice";
import { validityAction } from "../../../store/slices/validationSlice";
import useModal from "../../../hooks/useModal";
import useCheckboxFilter from "../../../hooks/useCheckboxFilter";
import styles from "./ModelStep.module.scss";

const ModelStep = () => {
    const dispatch = useDispatch();
    const { push } = useHistory();
    const [isOpened, toggle] = useModal();
    const { selectedCar, filteredCars, cars, categories, status } = useSelector(apiData);
    const { formRate, formLength, car } = useSelector(formData);
    const { locationValid } = useSelector(validationState);
    const [checked, check] = useCheckboxFilter();
    const [pickedCar, setPickedCar] = useState({ car: selectedCar });

    const hadleCardClick = (item) => {
        dispatch(apiAction({ selectedCar: item }));
        dispatch(formAction({ car: { name: item.name, id: item.id } }));
        dispatch(resetExtra());
        dispatch(resetApiCarExtra());
        setPickedCar({ ...pickedCar, car: item });
        if (!isOpened) toggle();
    };

    const handleCheck = (value) => {
        check(value);
    };

    useEffect(() => {
        if (locationValid === false) {
            push("/order");
        }
    }, [locationValid]);

    useEffect(() => {
        if (cars.status === "idle") {
            dispatch(fetchCars());
        }
    }, [cars.status]);

    useEffect(() => {
        if (categories.status === "idle") {
            dispatch(fetchCategories());
        }
    }, [categories.status]);

    useEffect(() => {
        if (!car.name) {
            dispatch(validityAction({ modelValid: false }));
            dispatch(validityAction({ extraValid: false }));
        } else {
            dispatch(validityAction({ modelValid: true }));
            dispatch(validityAction({ extraValid: true }));
        }
    }, [car.name]);

    useEffect(() => {
        if (!formLength.timeDate || !formRate) {
            dispatch(validityAction({ totalValid: false }));
        } else {
            dispatch(validityAction({ totalValid: true }));
        }
    }, [formLength.timeDate, formRate]);

    return (
        <form className={styles.modelForm}>
            {
                // eslint-disable-next-line no-nested-ternary
                cars.data.length > 0 && (
                    <div className={styles.modelFormList}>
                        <div className={styles.checkboxContainer}>
                            <div className={styles.box}>
                                {categories.data.map((category) => (
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
                            {filteredCars.length !== 0
                                ? filteredCars.map((item) => (
                                      <ModelCard
                                          onClick={() => hadleCardClick(item)}
                                          key={item.id}
                                          car={item}
                                          pickedCar={pickedCar}
                                      />
                                  ))
                                : cars.data.map((item) => (
                                      <ModelCard
                                          onClick={() => hadleCardClick(item)}
                                          key={item.id}
                                          car={item}
                                          pickedCar={pickedCar}
                                      />
                                  ))}
                        </div>
                    </div>
                )
            }
            {cars.status === "loading" && status !== "rejected" && <Preloader />}
            {status === "rejected" && (
                <div className={styles.textMessage}>Произошла ошибка при загрузке данных с сервера</div>
            )}
            {cars.length === 0 && <div className={styles.textMessage}>По данному адресу нет доступных авто</div>}
        </form>
    );
};

export default ModelStep;
