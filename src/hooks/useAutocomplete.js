import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
    formAction,
    fetchPoints,
    resetPoints,
    fetchGeoData,
    fetchGeoDataPoints,
    fetchChosenPoint,
    resetChosenPoint,
    resetSelectedCar,
} from "../store/slices/formSlice";

const useAutocomplete = () => {
    const dispatch = useDispatch();
    const points = useSelector((state) => state.form.points.data);
    const pointsStatus = useSelector((state) => state.form.points.status);
    const geodata = useSelector((state) => state.form.geodata);
    const stateForm = useSelector((state) => state.form);
    const city = useSelector((state) => state.form.city);
    const chosenPoint = useSelector((state) => state.form.point);

    const onCityChange = (option) => {
        if (option) {
            if (option.value !== stateForm.city.name) dispatch(resetPoints());
            dispatch(formAction({ city: "", point: "" }));
            dispatch(formAction({ city: { name: option.value, id: option.id } }));
        }
    };

    const onPointChange = (option) => {
        if (option) {
            dispatch(formAction({ point: { name: option.value, id: option.id } }));

            dispatch(formAction({ car: "" }));
            dispatch(resetSelectedCar());
        }
    };

    const onReset = (e) => {
        e.preventDefault(e);
        if (e.currentTarget.name === "city") {
            dispatch(formAction({ city: "", point: "" }));
            dispatch(resetPoints());
            dispatch(resetSelectedCar());

            // dispatch(rese)
        } else {
            dispatch(formAction({ point: "" }));
            dispatch(resetChosenPoint());
            dispatch(resetSelectedCar());
        }
    };

    useEffect(() => {
        if (city.name && pointsStatus === "idle") {
            dispatch(fetchPoints(city.id));
            dispatch(fetchGeoData(city.name));
        }
    }, [city.name, pointsStatus]);

    useEffect(() => {
        if (chosenPoint.name) dispatch(fetchChosenPoint(`${city.name}, ${chosenPoint.name}`));
    }, [chosenPoint.name]);

    useEffect(() => {
        if (city.name && points && !geodata.points)
            points.forEach((item) => {
                dispatch(fetchGeoDataPoints(`${item.cityId.name}, ${item.address}`));
            });
    }, [city.name, points]);

    return {
        onCityChange,
        onPointChange,
        onReset,
    };
};
export default useAutocomplete;
