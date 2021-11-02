import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { YMaps } from "react-yandex-maps";
import Autocomplete from "./Autocomplete/Autocomplete.jsx";
import YaMap from "./Map/Map.jsx";
import useModal from "../../../hooks/useModal";
import useAutocomplete from "../../../hooks/useAutocomplete";
import { yandexApiKey } from "../../../constants/constants";
import { fetchCities, resetFilteredCars } from "../../../store/slices/apiSlice";
import { validityAction } from "../../../store/slices/validationSlice";
import { apiData, formData } from "../../../store/selectors/selectors";
import styles from "./LocationStep.module.scss";
import Preloader from "../../Common/UI/Preloader/Preloader.jsx";

const LocationStep = () => {
    const dispatch = useDispatch();
    const [isOpened, toggle] = useModal();
    const { cities, points } = useSelector(apiData);
    const { city, point, car } = useSelector(formData);
    // const formData = useSelector((state) => state.form);
    const cityOptions = cities.data
        ? cities.data.map((item) => ({ value: item.name, label: item.name, id: item.id }))
        : [];
    const pointOptions = points.data
        ? points.data.map((item) => ({ value: item.address, label: item.address, id: item.id }))
        : [];

    const { onCityChange, onPointChange, onReset } = useAutocomplete();

    useEffect(() => {
        if (cities.status === "idle") {
            dispatch(fetchCities());
        }
    }, [cities.status]);
    useEffect(() => {
        if (city && point) {
            dispatch(validityAction({ locationValid: true }));
            dispatch(validityAction({ modelValid: true }));
            if (!isOpened) toggle();
        } else {
            dispatch(validityAction({ locationValid: false }));
            dispatch(validityAction({ modelValid: false }));
            dispatch(validityAction({ extraValid: false }));
            dispatch(validityAction({ totalValid: false }));
        }
    }, [city, point]);
    useEffect(() => {
        if (!car.name) {
            dispatch(validityAction({ extraValid: false }));
            dispatch(validityAction({ totalValid: false }));
        } else {
            dispatch(validityAction({ extraValid: true }));
            dispatch(validityAction({ totalValid: true }));
        }
    }, [car.name]);

    useEffect(() => {
        dispatch(resetFilteredCars());
    }, []);

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
                        isDisabled={points.data.length === 0}
                        labelText="Пункт выдачи"
                    />

                    {cities.status === "loading" && <Preloader />}
                    {!city.name && <h3 className={styles.mapTitleMobile}>Выберите город</h3>}

                    {points.data && points.data.length !== 0 && (
                        <>
                            <h3 className={styles.mapTitle}>Выбрать на карте</h3>
                            <YaMap />
                        </>
                    )}
                    {city.name && points.status === "loading" && <Preloader />}
                    {city.name && points.data.length === 0 && (
                        <h3 className={styles.mapTitleMobile}>В выбранном городе нет доступных авто</h3>
                    )}
                </div>
            </form>
        </YMaps>
    );
};

export default LocationStep;
