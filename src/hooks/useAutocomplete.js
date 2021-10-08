import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPoints, resetPoints } from "../store/slices/pointSlice";
import { fetchGeoData, resetGeodata } from "../store/slices/geodataSlice";
import { fetchGeoDataPoints, resetGeodataPoints } from "../store/slices/geodataPointsSlice";
import { formAction } from "../store/slices/formSlice";
import { fetchSinglePoint, resetChosenPoint } from "../store/slices/singlePointSlice";
import { fetchPrices } from "../store/slices/priceRangeSlice";

const useAutocomplete = () => {
    const dispatch = useDispatch();
    const points = useSelector((state) => state.point.points);
    const stateForm = useSelector((state) => state.form);
    const initialState = {
        city: stateForm.city.name,
        point: stateForm.point.name,
    };
    const [state, setState] = useState(initialState);

    const onCityChange = (option) => {
        if (option) {
            dispatch(formAction({ city: "", point: "" }));
            dispatch(formAction({ city: { name: option.value, id: option.id } }));
            setState({ ...state, city: { name: option.value, id: option.id } });
        } else {
            setState({ ...state, city: "", point: "" });
            // dispatch(formAction({ city: {}, point: {} }));
        }
    };

    const onPointChange = (option) => {
        if (option) {
            dispatch(formAction({ point: { name: option.value, id: option.id } }));
            setState({ ...state, point: { name: option.value, id: option.id } });
        } else {
            // dispatch(formAction({ point: "" }));
            // dispatch(resetChosenPoint());
            setState({ ...state, point: "" });
        }
    };

    const onReset = (e) => {
        e.preventDefault(e);
        if (e.currentTarget.name === "city") {
            dispatch(formAction({ city: "", point: "" }));
            dispatch(resetPoints());
        } else {
            dispatch(formAction({ point: "" }));
        }
    };

    const { city, point } = state;

    useEffect(() => {
        if (stateForm.city.name) {
            dispatch(fetchPoints(stateForm.city.id));
            // dispatch(fetchGeoData(city.name));
        }
    }, [stateForm.city.name]);

    // useEffect(() => {
    //     if (city && points)
    //         points.forEach((item) => {
    //             dispatch(fetchGeoDataPoints(`${item.cityId.name}, ${item.address}`));
    //         });
    // }, [points]);

    // useEffect(() => {
    //     if (point) {
    //         dispatch(fetchSinglePoint(point.id));
    //         dispatch(fetchGeoData(`${city.name}, ${point.name}`));
    //         dispatch(fetchPrices({ cityId: city.id, pointId: point.id }));
    //         // dispatch(fetchGeoDataPoints(`${point.cityId.name}, ${point.address}`));
    //     }
    // }, [point]);

    return {
        onCityChange,
        onPointChange,
        city,
        point,
        onReset,
    };
};
export default useAutocomplete;
