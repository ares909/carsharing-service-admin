import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { YMaps } from "react-yandex-maps";
import classNames from "classnames";
import Autocomplete from "./Autocomplete/Autocomplete.jsx";
import YaMap from "./Map/Map.jsx";
import FormSubmit from "../Common/FormSubmit/FormSubmit.jsx";
import OrderContainer from "../Common/OrderContainer/OrderContainer.jsx";
import useModal from "../../../hooks/useModal";
import useAutocomplete from "../../../hooks/useAutocomplete";
import { yandexApiKey } from "../../../constants/constants";
import { formAction, fetchCities, fetchOrder, resetFilteredCars } from "../../../store/slices/formSlice";
import styles from "./LocationStep.module.scss";

const LocationStep = () => {
    const dispatch = useDispatch();
    const [isOpened, toggle] = useModal();
    const dataStatus = useSelector((state) => state.form.cities.status);
    const stateForm = useSelector((state) => state.form);
    const city = useSelector((state) => state.form.city);
    const point = useSelector((state) => state.form.point);
    const cities = useSelector((state) => state.form.cities.data);
    const points = useSelector((state) => state.form.points.data);
    const pointsStatus = useSelector((state) => state.form.points.status);
    const cityOptions = cities ? cities.map((item) => ({ value: item.name, label: item.name, id: item.id })) : [];
    const pointOptions = points
        ? points.map((item) => ({ value: item.address, label: item.address, id: item.id }))
        : [];
    const buttonClassName = classNames({
        [`${styles.formButton}`]: true,
        [`${styles.formButtonDisabled}`]: !stateForm.locationValid,
    });
    const { push } = useHistory();
    const location = {
        pathname: "/order/model",
    };

    const { onCityChange, onPointChange, onReset } = useAutocomplete();

    useEffect(() => {
        if (dataStatus === "idle") {
            dispatch(fetchCities());
        }
    }, [dataStatus]);
    useEffect(() => {
        if (city && point) {
            dispatch(formAction({ locationValid: true }));
            dispatch(formAction({ modelValid: true }));
            if (!isOpened) {
                toggle();
            }
        } else {
            dispatch(formAction({ locationValid: false }));
            dispatch(formAction({ modelValid: false }));
            dispatch(formAction({ extraValid: false }));
        }
    }, [city, point]);

    useEffect(() => {
        dispatch(resetFilteredCars());
    }, []);

    const onSubmit = () => {
        dispatch(fetchOrder({ cityId: city.id, pointId: point.id }));
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
                        ) : // eslint-disable-next-line no-nested-ternary
                        points && points.length !== 0 ? (
                            <>
                                <h3 className={styles.mapTitle}>Выбрать на карте</h3>
                                <YaMap />
                            </>
                        ) : pointsStatus === "loading" ? (
                            <h3 className={styles.mapTitle}>Загрузка...</h3>
                        ) : (
                            <h3 className={styles.mapTitleMobile}>В выбранном городе нет доступных авто</h3>
                        )
                    }
                </div>
                <FormSubmit
                    onSubmit={onSubmit}
                    buttonName="Выбрать модель"
                    buttonClassName={buttonClassName}
                    isDisabled={!stateForm.locationValid}
                    isOpened={isOpened}
                    toggle={toggle}
                >
                    <OrderContainer name="Пункт выдачи" data={`${city.name}, \n ${point.name}`} />
                </FormSubmit>
            </form>
        </YMaps>
    );
};

export default LocationStep;
