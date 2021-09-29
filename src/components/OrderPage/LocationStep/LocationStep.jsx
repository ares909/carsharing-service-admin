import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm, useFormState } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { YMaps } from "react-yandex-maps";
import classNames from "classnames";
import styles from "./LocationStep.module.scss";
import { formAction } from "../../../store/slices/formSlice";
import { fetchCities } from "../../../store/slices/locationSlice";

import Autocomplete from "./Autocomplete.jsx";
import Button from "../../Common/UI/Button.jsx";
import MyPlacemark from "./Map.jsx";
import { yandexApiKey } from "../../../constants/constants";
import { fetchGeoDataPoints } from "../../../store/slices/geodataPointsSlice";

const LocationStep = () => {
    const stateForm = useSelector((state) => state.form);
    const dataStatus = useSelector((state) => state.location.status);
    const cities = useSelector((state) => state.location.cities);
    const points = useSelector((state) => state.point.points);
    const { push } = useHistory();
    const location = {
        pathname: "/order/model",
        state: { complete: true },
    };
    const dispatch = useDispatch();
    const mapRef = useRef();
    const [isValid, setValid] = useState(false);
    useEffect(() => {
        if (dataStatus === "idle") {
            dispatch(fetchCities());
        }
    }, [dataStatus]);

    useEffect(() => {
        if (stateForm.city && stateForm.point) {
            setValid(true);
        } else {
            setValid(false);
        }
    }, [stateForm.city, stateForm.point]);

    const { handleSubmit, register } = useForm({
        mode: "onChange",
        defaultValues: stateForm,
    });

    const onSubmit = (data) => {
        // dispatch(formAction(data));
        push(location);
        console.log(data);
        // console.log(cityId);
    };

    return (
        <YMaps
            query={{
                apikey: yandexApiKey,
                ns: "use-load-option",
                load: "Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon",
            }}
        >
            <form className={styles.locationForm} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.inputContainer}>
                    <label className={styles.inputLabel}>Город</label>
                    <Autocomplete suggestions={cities} register={register} name="city" valueState={stateForm.city} />
                </div>
                <div className={styles.inputContainer}>
                    <label className={styles.inputLabel}>Пункт выдачи</label>
                    <Autocomplete suggestions={points} register={register} name="point" valueState={stateForm.point} />
                </div>

                <Button
                    disabled={!isValid}
                    className={classNames({
                        [`${styles.formButton}`]: true,
                        [`${styles.formButtonDisabled}`]: !isValid,
                    })}
                    type="submit"
                    name="Выбрать модель"
                />
                <MyPlacemark mapRef={mapRef} points={points} />
            </form>
        </YMaps>
    );
};

export default LocationStep;
