import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { YMaps } from "react-yandex-maps";
import classNames from "classnames";
import Autocomplete from "./Autocomplete/Autocomplete.jsx";
import Button from "../../Common/UI/Button.jsx";
import YaMap from "./Map/Map.jsx";
import FormSubmit from "../Common/FormSubmit/FormSubmit.jsx";
import { yandexApiKey } from "../../../constants/constants";
import useNumberFormat from "../../../hooks/useNumberFormat";
import { fetchCities } from "../../../store/slices/locationSlice";
import { formAction } from "../../../store/slices/formSlice";
import styles from "./LocationStep.module.scss";
import OrderContainer from "../Common/OrderContainer/OrderContainer.jsx";

const LocationStep = () => {
    const dataStatus = useSelector((state) => state.location.status);
    const stateForm = useSelector((state) => state.form);
    const cities = useSelector((state) => state.location.cities);
    const points = useSelector((state) => state.point.points);
    const priceMin = useSelector((state) => state.priceRange.pricesMin);
    const priceMax = useSelector((state) => state.priceRange.pricesMax);
    const { push } = useHistory();
    const { convertNumber } = useNumberFormat();
    const location = {
        pathname: "/order/model",
    };
    const dispatch = useDispatch();

    useEffect(() => {
        if (dataStatus === "idle") {
            dispatch(fetchCities());
        }
    }, [dataStatus]);
    useEffect(() => {
        if (stateForm.city && stateForm.point) {
            dispatch(formAction({ locationValid: true }));
        } else {
            dispatch(formAction({ locationValid: false }));
        }
    }, [stateForm.city, stateForm.point]);

    const { register } = useForm({
        defaultValues: stateForm,
    });

    const onSubmit = () => {
        push(location);
    };

    const priceRange =
        priceMin.length !== 0
            ? `от ${convertNumber(priceMin[0])} до ${convertNumber(priceMax[priceMax.length - 1])} ₽`
            : `нет данных`;

    return (
        <YMaps
            query={{
                apikey: yandexApiKey,
                ns: "use-load-option",
                load: "Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon",
            }}
        >
            <form className={styles.locationForm}>
                <div className={styles.locationContainer}>
                    <div className={styles.inputContainer}>
                        <label className={styles.inputLabel}>Город</label>
                        <Autocomplete
                            suggestions={cities}
                            register={register}
                            name="city"
                            valueState={stateForm.city}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <label className={styles.inputLabel}>Пункт выдачи</label>
                        <Autocomplete
                            suggestions={points}
                            register={register}
                            name="point"
                            valueState={stateForm.point}
                        />
                    </div>

                    <h3 className={styles.mapTitle}>Выбрать на карте</h3>
                    <YaMap points={points} />
                </div>
                <FormSubmit
                    price={priceRange}
                    onSubmit={onSubmit}
                    buttonName="Выбрать модель"
                    buttonClassName={classNames({
                        [`${styles.formButton}`]: true,
                        [`${styles.formButtonDisabled}`]: !stateForm.locationValid,
                    })}
                >
                    <OrderContainer name="Пункт выдачи" data={`${stateForm.city}, \n ${stateForm.point}`} />
                </FormSubmit>
                {/* <div className={styles.submitContainer}>
                    <h3 className={styles.submitHeader}>Ваш заказ:</h3>
                    {stateForm.city && stateForm.point ? (
                        <>
                            <div className={styles.pointContainer}>
                                <span className={styles.point}>Пункт выдачи</span>
                                <span className={styles.dots}></span>
                                <div className={styles.text}>
                                    <p className={styles.textPart}>{`${stateForm.city},`}</p>
                                    <p className={styles.textPart}>{stateForm.point}</p>
                                </div>
                            </div>
                            <div className={styles.priceContainer}>
                                <p className={styles.priceTitle}>Цена: </p>
                                <span className={styles.price}>
                                    {priceMin.length !== 0
                                        ? `от ${convertNumber(priceMin[0])} до ${convertNumber(
                                              priceMax[priceMax.length - 1],
                                          )} ₽`
                                        : `нет данных`}
                                </span>
                            </div>
                        </>
                    ) : (
                        <></>
                    )}

                    <Button
                        disabled={!stateForm.locationValid}
                        className={classNames({
                            [`${styles.formButton}`]: true,
                            [`${styles.formButtonDisabled}`]: !stateForm.locationValid,
                        })}
                        type="button"
                        name="Выбрать модель"
                        onClick={onSubmit}
                    />
                </div> */}

                <div
                    className={classNames({
                        [`${styles.submitMobileContainer}`]: true,
                        [`${styles.submitMobileContainerActive}`]: stateForm.city && stateForm.point,
                    })}
                >
                    <h3 className={styles.submitHeader}>Ваш заказ:</h3>

                    <div className={styles.pointContainer}>
                        <span className={styles.point}>Пункт выдачи</span>
                        <span className={styles.dots}></span>
                        <div className={styles.text}>
                            <p className={styles.textPart}>{`${stateForm.city},`}</p>
                            <p className={styles.textPart}>{stateForm.point}</p>
                        </div>
                    </div>
                    <div className={styles.priceContainer}>
                        <p className={styles.priceTitle}>Цена: </p>
                        <span className={styles.price}>{`от ${convertNumber(priceMin[0])} до ${convertNumber(
                            priceMax[priceMax.length - 1],
                        )} ₽`}</span>
                    </div>

                    <Button
                        disabled={!stateForm.locationValid}
                        className={classNames({
                            [`${styles.formButton}`]: true,
                            [`${styles.formButtonDisabled}`]: !stateForm.locationValid,
                        })}
                        type="button"
                        name="Выбрать модель"
                        onClick={onSubmit}
                    />
                </div>
            </form>
        </YMaps>
    );
};

export default LocationStep;
