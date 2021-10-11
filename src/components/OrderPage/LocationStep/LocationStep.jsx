import React, { useEffect } from "react";
import Select from "react-select";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { YMaps } from "react-yandex-maps";
import classNames from "classnames";
import Autocomplete from "./Autocomplete/Autocomplete.jsx";
import Button from "../../Common/UI/Button.jsx";
import YaMap from "./Map/Map.jsx";
import useAutocomplete from "../../../hooks/useAutocomplete";
import { yandexApiKey } from "../../../constants/constants";
import useNumberFormat from "../../../hooks/useNumberFormat";
import { formAction, fetchCities } from "../../../store/slices/formSlice";
import styles from "./LocationStep.module.scss";
import FormSubmit from "../Common/FormSubmit/FormSubmit.jsx";
import OrderContainer from "../Common/OrderContainer/OrderContainer.jsx";

const LocationStep = () => {
    const dataStatus = useSelector((state) => state.form.cities.status);
    const stateForm = useSelector((state) => state.form);
    const city = useSelector((state) => state.form.city);
    const point = useSelector((state) => state.form.point);
    const cities = useSelector((state) => state.form.cities.data);
    const points = useSelector((state) => state.form.points.data);

    const cityOptions = cities ? cities.map((item) => ({ value: item.name, label: item.name, id: item.id })) : [];
    const pointOptions = points
        ? points.map((item) => ({ value: item.address, label: item.address, id: item.id }))
        : [];

    const { push } = useHistory();
    const { convertNumber } = useNumberFormat();
    const location = {
        pathname: "/order/model",
    };
    const dispatch = useDispatch();

    const { onCityChange, onPointChange, onReset } = useAutocomplete();

    useEffect(() => {
        if (dataStatus === "idle") {
            dispatch(fetchCities());
        }
    }, [dataStatus]);
    useEffect(() => {
        if (stateForm.city && stateForm.point) {
            dispatch(formAction({ locationValid: true }));
            dispatch(formAction({ modelValid: true }));
        } else {
            dispatch(formAction({ locationValid: false }));
            dispatch(formAction({ modelValid: false }));
        }
    }, [stateForm.city, stateForm.point]);

    const onSubmit = () => {
        push(location);
    };

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
                    <Autocomplete
                        name="city"
                        onChange={onCityChange}
                        options={cityOptions}
                        valueState={city.name}
                        placeholder={"Начните вводить город"}
                        onReset={onReset}
                        labelText="Город"
                    />
                    <Autocomplete
                        name="point"
                        onChange={onPointChange}
                        options={pointOptions}
                        valueState={point.name}
                        placeholder={"Начните вводить пункт"}
                        onReset={onReset}
                        isDisabled={points.length === 0}
                        labelText="Пункт выдачи"
                    />

                    {
                        // eslint-disable-next-line no-nested-ternary
                        !city.name ? (
                            <h3 className={styles.mapTitleMobile}>Выберите город</h3>
                        ) : points && points.length !== 0 ? (
                            <>
                                <h3 className={styles.mapTitle}>Выбрать на карте</h3>
                                <YaMap />
                            </>
                        ) : (
                            <h3 className={styles.mapTitleMobile}>В выбранном городе нет доступных авто</h3>
                        )
                    }
                </div>
                <FormSubmit
                    // price={priceRange}
                    onSubmit={onSubmit}
                    buttonName="Выбрать модель"
                    buttonClassName={classNames({
                        [`${styles.formButton}`]: true,
                        [`${styles.formButtonDisabled}`]: !stateForm.locationValid,
                    })}
                >
                    <OrderContainer name="Пункт выдачи" data={`${city.name}, \n ${point.name}`} />
                </FormSubmit>
                {/* <div className={styles.submitContainer}>
                    <h3 className={styles.submitHeader}>Ваш заказ:</h3>
                    {stateForm.city && stateForm.point ? (
                        <>
                            <div className={styles.pointContainer}>
                                <span className={styles.point}>Пункт выдачи</span>
                                <span className={styles.dots}></span>
                                <div className={styles.text}>
                                    <p className={styles.textPart}>{`${stateForm.city.name},`}</p>
                                    <p className={styles.textPart}>{`${stateForm.point.name}`}</p>
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
                {/* 
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
                </div> */}
            </form>
        </YMaps>
    );
};

export default LocationStep;
