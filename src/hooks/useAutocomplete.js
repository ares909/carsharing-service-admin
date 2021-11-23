import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { apiData, formData } from "../store/selectors/selectors";
import {
    fetchPoints,
    fetchGeoData,
    fetchGeoDataPoints,
    fetchChosenPoint,
    resetApiData,
    resetModelData,
} from "../store/slices/apiSlice";

import { formAction, resetForm, resetModel, resetPoint } from "../store/slices/formSlice";

const useAutocomplete = () => {
    const dispatch = useDispatch();
    const { cities, points, geodata } = useSelector(apiData);
    const { city, point } = useSelector(formData);

    const onCityChange = (option) => {
        if (option) {
            if (option.value !== city.name) dispatch(resetApiData());
            dispatch(resetForm());
            dispatch(formAction({ city: { name: option.value, id: option.id } }));
        }
    };

    const onPointChange = (option) => {
        if (option) {
            dispatch(formAction({ point: { name: option.value, id: option.id } }));
            dispatch(resetModel());
            dispatch(resetModelData());
        }
    };

    const onReset = (e) => {
        e.preventDefault(e);
        if (e.currentTarget.name === "city") {
            dispatch(resetApiData());
            dispatch(resetForm());
        } else {
            dispatch(resetPoint());
            dispatch(resetModelData());
        }
    };

    useEffect(() => {
        if (city.name && points.status === "idle") {
            dispatch(fetchPoints(city.id));
            dispatch(fetchGeoData(city.name));
        }
    }, [city.name, points.status]);

    useEffect(() => {
        if (point.name) dispatch(fetchChosenPoint(`${city.name}, ${point.name}`));
    }, [point.name]);

    useEffect(() => {
        if (city.name && points.data && !geodata.points)
            points.data.forEach((item) => {
                dispatch(fetchGeoDataPoints(`${item.cityId.name}, ${item.address}`));
            });
    }, [city.name, points.data]);

    return {
        onCityChange,
        onPointChange,
        onReset,
    };
};
export default useAutocomplete;
