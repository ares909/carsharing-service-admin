import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import { fetchPoints, resetPoints } from "../../../../store/slices/pointSlice";
import { fetchGeoData, resetGeodata } from "../../../../store/slices/geodataSlice";
import { formAction } from "../../../../store/slices/formSlice";
import { fetchGeoDataPoints, resetGeodataPoints } from "../../../../store/slices/geodataPointsSlice";
import { fetchSinglePoint, resetChosenPoint } from "../../../../store/slices/singlePointSlice";
import { fetchPrices } from "../../../../store/slices/priceRangeSlice";
import styles from "./Autocomplete.module.scss";

const Autocomplete = ({ suggestions, register, valueState, name }) => {
    const dispatch = useDispatch();
    const points = useSelector((state) => state.point.points);
    const stateForm = useSelector((state) => state.form);

    const options = suggestions
        ? suggestions.map((item) =>
              name === "city"
                  ? { value: item.name, label: item.name, id: item.id }
                  : { value: item.address, label: item.address, id: item.id },
          )
        : [];

    const [state, setState] = useState({
        filteredSuggestions: [],
        showSuggestions: false,
        userInput: valueState,
        city: "",
        point: "",
        defaultInputValue: valueState,
    });

    // const onChange = (option) => {
    //     if (option && name === "city") {
    //         dispatch(formAction({ [name]: option.value }));
    //         setState({ ...state, city: { name: option.value, id: option.id } });
    //     } else if (stateForm.city && option && name === "point") {
    //         dispatch(formAction({ [name]: option.value }));
    //         setState({ ...state, point: { name: option.value, id: option.id } });
    //     } else if (!option && name === "city") {
    //         dispatch(formAction({ city: "", point: "" }));
    //         dispatch(resetChosenPoint());
    //         dispatch(resetGeodataPoints());
    //         dispatch(resetGeodata());
    //         setState({ ...state, city: "", point: "" });
    //     } else if (!option && name === "point") {
    //         dispatch(formAction({ point: "" }));
    //         dispatch(resetChosenPoint());
    //     }

    const onCityChange = (option) => {
        if (option) {
            dispatch(formAction({ [name]: option.value }));
            setState({ ...state, city: { name: option.value, id: option.id } });
        } else {
            dispatch(formAction({ city: "", point: "" }));
            dispatch(resetChosenPoint());
            dispatch(resetGeodataPoints());
            dispatch(resetGeodata());
        }
    };

    const onPointChange = (option) => {
        if (option) {
            dispatch(formAction({ [name]: option.value }));
            setState({ ...state, point: { name: option.value, id: option.id } });
        } else {
            dispatch(formAction({ city: "", point: "" }));
            dispatch(resetChosenPoint());
            dispatch(resetGeodataPoints());
            dispatch(resetGeodata());
        }
    };

    // const userInput = e.value || "";
    // const filteredSuggestions = options.filter(
    //     (option) =>
    //         (name === "city" ? option.name : option.address).toLowerCase().indexOf(userInput.toLowerCase()) > -1,
    // );

    // const onClick = (e) => {
    //     dispatch(formAction({ [name]: e.currentTarget.innerText }));

    //     if (name === "city") {
    //         const filteredCity = suggestions.find(
    //             (suggestion) => suggestion.name.toLowerCase() === e.currentTarget.innerText.toLowerCase(),
    //         );
    //         setState({
    //             ...state,
    //             filteredSuggestions: [],
    //             showSuggestions: false,
    //             userInput: e.currentTarget.innerText,
    //             city: filteredCity,
    //         });
    //     } else {
    //         const filteredPoint = suggestions.find(
    //             (suggestion) => suggestion.address.toLowerCase() === e.currentTarget.innerText.toLowerCase(),
    //         );
    //         setState({
    //             ...state,
    //             filteredSuggestions: [],
    //             showSuggestions: false,
    //             userInput: valueState || e.currentTarget.innerText,
    //             point: filteredPoint,
    //         });
    //     }
    // };

    const onReset = (e) => {
        e.preventDefault();

        if (e.target.previousSibling.name === "city") {
            dispatch(formAction({ city: "", point: "" }));
            dispatch(resetChosenPoint());
            dispatch(resetGeodataPoints());
            dispatch(resetGeodata());
            setState({
                filteredSuggestions: [],
                showSuggestions: false,
                userInput: "",
                city: "",
                point: "",
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

    useEffect(() => {
        if (city && points)
            points.forEach((item) => {
                dispatch(fetchGeoDataPoints(`${item.cityId.name}, ${item.address}`));
            });
    }, [points]);

    useEffect(() => {
        if (point) {
            dispatch(fetchSinglePoint(point.id));
            dispatch(fetchGeoData(`${city.name}, ${point.name}`));
            dispatch(fetchPrices({ cityId: city.id, pointId: point.id }));
            // dispatch(fetchGeoDataPoints(`${point.cityId.name}, ${point.address}`));
        }
    }, [point]);

    useEffect(() => {
        if (valueState) {
            setState({ ...state, userInput: valueState });
        }
    }, [valueState, userInput]);

    // let suggestionsListComponent;
    // if (showSuggestions && userInput) {
    //     if (filteredSuggestions.length) {
    //         suggestionsListComponent = (
    //             <ul className={styles.suggestionsContainter}>
    //                 {filteredSuggestions.map((suggestion) => {
    //                     return (
    //                         <li className={styles.suggestions} key={suggestion.id} onClick={onClick}>
    //                             {name === "city" ? suggestion.name : suggestion.address}
    //                         </li>
    //                     );
    //                 })}
    //             </ul>
    //         );
    //     } else {
    //         suggestionsListComponent = (
    //             <div className={styles.noSuggestions}>
    //                 <em>Место не найдено</em>
    //             </div>
    //         );
    //     }
    // }
    // let options = {}

    return (
        <div className={styles.inputContainer}>
            {/* <input
                type="search"
                {...register(name, { required: "Введите пункт" })}
                onChange={onChange}
                value={userInput}
                autoComplete="off"
                className={styles.input}
                placeholder={name === "city" ? "Начните вводить город" : "Начните вводить пункт"}
            />
            <button onClick={onReset} className={styles.inputCrossButton}></button> */}

            {/* {suggestionsListComponent} */}
            <Select
                // {...register(name, { required: "Введите пункт" })}
                onChange={name === "city" ? onCityChange : onPointChange}
                defaultInputValue={state.defaultInputValue}
                options={options}
                isSearchable={true}
                isClearable={true}
                onClick={(e) => console.log(e.currentTarget)}
                placeholder={name === "city" ? "Начните вводить город" : "Начните вводить пункт"}
                // onChange={onChange}
            />
        </div>
    );
};

export default Autocomplete;
