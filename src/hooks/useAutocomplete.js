import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
    apiAction,
    fetchPoints,
    resetPoints,
    fetchGeoData,
    fetchGeoDataPoints,
    fetchChosenPoint,
    resetChosenPoint,
    resetSelectedCar,
    resetApiCarExtra,
} from "../store/slices/apiSlice";

import { formAction, resetExtra } from "../store/slices/formSlice";

const useAutocomplete = () => {
    const dispatch = useDispatch();
    const apiData = useSelector((state) => state.api);
    const formData = useSelector((state) => state.form);

    const onCityChange = (option) => {
        if (option) {
            if (option.value !== formData.city.name) dispatch(resetPoints());
            dispatch(formAction({ city: "", point: "" }));
            dispatch(formAction({ city: { name: option.value, id: option.id } }));
        }
    };

    const onPointChange = (option) => {
        if (option) {
            dispatch(formAction({ point: { name: option.value, id: option.id } }));

            dispatch(formAction({ car: "" }));
            dispatch(resetSelectedCar());
            dispatch(resetExtra());
            dispatch(resetApiCarExtra());
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
        if (formData.city.name && apiData.points.status === "idle") {
            dispatch(fetchPoints(formData.city.id));
            dispatch(fetchGeoData(formData.city.name));
        }
    }, [formData.city.name, apiData.points.status]);

    useEffect(() => {
        if (formData.point.name) dispatch(fetchChosenPoint(`${formData.city.name}, ${formData.point.name}`));
    }, [formData.point.name]);

    useEffect(() => {
        if (formData.city.name && apiData.points.data && !apiData.geodata.points)
            apiData.points.data.forEach((item) => {
                dispatch(fetchGeoDataPoints(`${item.cityId.name}, ${item.address}`));
            });
    }, [formData.city.name, apiData.points.data]);

    return {
        onCityChange,
        onPointChange,
        onReset,
    };
};
export default useAutocomplete;
