import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPoints, resetPoints } from "../../../store/slices/pointSlice";
import { fetchGeoData, resetGeodata } from "../../../store/slices/geodataSlice";
import { formAction } from "../../../store/slices/formSlice";
import { fetchGeoDataPoints, resetGeodataPoints } from "../../../store/slices/geodataPointsSlice";
import { fetchSinglePoint, resetChosenPoint } from "../../../store/slices/singlePointSlice";
import styles from "./Autocomplete.module.scss";
import Button from "../../Common/UI/Button.jsx";
import inputCrossButton from "../../../images/autocomplete/inputCrossButton.svg";

const Autocomplete = ({ suggestions, register, valueState, errors, name }) => {
    const dispatch = useDispatch();
    const points = useSelector((state) => state.point.points);
    // const { onChange, showSuggestions, filteredSuggestions, onClick, userInput, cityId } = useAutocomplete(suggestions);

    const [state, setState] = useState({
        filteredSuggestions: [],
        showSuggestions: false,
        userInput: valueState,
        city: "",
        point: "",
    });

    // const { activeSuggestion, filteredSuggestions, showSuggestions, userInput } = state;

    const onChange = (e) => {
        const userInput = e.currentTarget.value;
        const filteredSuggestions = suggestions.filter(
            (suggestion) =>
                (name === "city" ? suggestion.name : suggestion.address)
                    .toLowerCase()
                    .indexOf(userInput.toLowerCase()) > -1,
        );

        setState({
            filteredSuggestions,
            showSuggestions: true,
            userInput,
        });
    };

    const onClick = (e) => {
        dispatch(formAction({ [name]: e.currentTarget.innerText }));
        // dispatch(resetPoints());

        if (name === "city") {
            const filteredCity = suggestions.find(
                (suggestion) => suggestion.name.toLowerCase() === e.currentTarget.innerText.toLowerCase(),
            );
            setState({
                ...state,
                filteredSuggestions: [],
                showSuggestions: false,
                userInput: e.currentTarget.innerText,
                city: filteredCity,
            });
        } else {
            const filteredPoint = suggestions.find(
                (suggestion) => suggestion.address.toLowerCase() === e.currentTarget.innerText.toLowerCase(),
            );
            setState({
                ...state,
                filteredSuggestions: [],
                showSuggestions: false,
                userInput: e.currentTarget.innerText,
                point: filteredPoint,
            });
        }
    };

    const onReset = (e) => {
        e.preventDefault();

        if (e.target.previousSibling.name === "city") {
            dispatch(formAction({ city: "", point: "" }));
            dispatch(resetChosenPoint());
            dispatch(resetGeodataPoints());
            dispatch(resetGeodata());
            setState({
                ...state,
                userInput: "",
            });
        } else {
            setState({
                ...state,
                userInput: "",
            });
            dispatch(resetChosenPoint());
            dispatch(formAction({ [name]: "" }));
        }
    };

    const { filteredSuggestions, showSuggestions, userInput, city, point } = state;

    useEffect(() => {
        if (city) {
            dispatch(fetchPoints(city.id));
            dispatch(fetchGeoData(city.name));
        }
    }, [city]);

    // useEffect(() => {
    //     if (city && points)
    //         points.forEach((item) => {
    //             dispatch(fetchGeoDataPoints(`${item.cityId.name}, ${item.address}`));
    //         });
    // }, [points]);

    useEffect(() => {
        if (city && points)
            points.forEach((item) => {
                dispatch(fetchGeoDataPoints(`${item.cityId.name}, ${item.address}`));
            });
    }, [points]);

    useEffect(() => {
        if (point) {
            dispatch(fetchSinglePoint(point.id));
            dispatch(fetchGeoData(`${point.cityId.name}, ${point.address}`));
            // dispatch(fetchGeoDataPoints(`${point.cityId.name}, ${point.address}`));
        }
    }, [point]);

    useEffect(() => {
        if (valueState) {
            setState({ ...state, userInput: valueState });
        }
    }, [valueState]);

    let suggestionsListComponent;
    if (showSuggestions && userInput) {
        if (filteredSuggestions.length) {
            suggestionsListComponent = (
                <ul className={styles.suggestionsContainter}>
                    {filteredSuggestions.map((suggestion, index) => {
                        return (
                            <li className={styles.suggestions} key={suggestion.id} onClick={onClick}>
                                {name === "city" ? suggestion.name : suggestion.address}
                            </li>
                        );
                    })}
                </ul>
            );
        } else {
            suggestionsListComponent = (
                <div className={styles.noSuggestions}>
                    <em>Место не найдено</em>
                </div>
            );
        }
    }

    return (
        <div className={styles.inputContainer}>
            <input
                type="search"
                {...register(name, { required: "Введите пункт" })}
                onChange={onChange}
                value={userInput}
                autoComplete="off"
                className={styles.input}
                placeholder={name === "city" ? "Начните вводить город" : "Начните вводить пункт"}
            />
            <button onClick={onReset} className={styles.inputCrossButton}>
                {/* <img className={styles.inputCrossImage} src={inputCrossButton} /> */}
            </button>

            {/* {name === "city"
                ? errors.city && <p>{errors.city.message}</p>
                : errors.point && <p>{errors.point.message}</p>} */}

            {suggestionsListComponent}
        </div>
    );
};

export default Autocomplete;
