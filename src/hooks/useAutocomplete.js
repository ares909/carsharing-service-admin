import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPoints, resetPoints } from "../store/slices/pointSlice";
import { fetchGeoData } from "../store/slices/geodataSlice";
import { fetchGeoDataPoints, resetGeodata } from "../store/slices/geodataPointsSlice";
import styles from "../components/OrderPage/LocationStep/Autocomplete.module.scss";

const useAutocomplete = (suggestions, name, valueState) => {
    // const [state, setState] = useState({
    //     activeSuggestion: 0,
    //     filteredSuggestions: [],
    //     showSuggestions: false,
    //     userInput: "",
    //     cityId: "",
    // });

    // // const { activeSuggestion, filteredSuggestions, showSuggestions, userInput } = state;

    // const onChange = (e) => {
    //     const userInput = e.currentTarget.value;
    //     const filteredSuggestions = suggestions.filter(
    //         (suggestion) => suggestion.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1,
    //     );

    //     setState({
    //         activeSuggestion: 0,
    //         filteredSuggestions,
    //         showSuggestions: true,
    //         userInput,
    //     });
    // };

    // const onClick = (e) => {
    //     const filteredCity = suggestions.find(
    //         (suggestion) => suggestion.name.toLowerCase() === e.currentTarget.innerText.toLowerCase(),
    //     );
    //     setState({
    //         activeSuggestion: 0,
    //         filteredSuggestions: [],
    //         showSuggestions: false,
    //         userInput: e.currentTarget.innerText,
    //         cityId: "" || filteredCity.id,
    //     });
    // };

    // const { activeSuggestion, filteredSuggestions, showSuggestions, userInput, cityId } = state;

    // let suggestionsListComponent;
    // if (showSuggestions && userInput) {
    //     if (filteredSuggestions.length) {
    //         suggestionsListComponent = (
    //             <ul className="suggestions">
    //                 {filteredSuggestions.map((suggestion, index) => {
    //                     let className;

    //                     return (
    //                         <li className={className} key={suggestion.id} onClick={onClick}>
    //                             {suggestion.name}
    //                         </li>
    //                     );
    //                 })}
    //             </ul>
    //         );
    //     } else {
    //         suggestionsListComponent = (
    //             <div className="no-suggestions">
    //                 <em>No suggestions available.</em>
    //             </div>
    //         );
    //     }
    // }

    // return {
    //     onChange,
    //     onClick,
    //     suggestionsListComponent,
    //     userInput,
    //     cityId,
    //     activeSuggestion,
    //     filteredSuggestions,
    //     showSuggestions,
    // };
    const dispatch = useDispatch();
    // const { onChange, showSuggestions, filteredSuggestions, onClick, userInput, cityId } = useAutocomplete(suggestions);

    const [state, setState] = useState({
        filteredSuggestions: [],
        showSuggestions: false,
        userInput: valueState,
        city: "",
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
        // dispatch(resetPoints());
        dispatch(resetGeodata());

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
            setState({
                ...state,

                filteredSuggestions: [],
                showSuggestions: false,
                userInput: e.currentTarget.innerText,
            });
        }
    };

    const { filteredSuggestions, showSuggestions, userInput, city } = state;

    useEffect(() => {
        if (city) {
            dispatch(fetchPoints(city.id));
            dispatch(fetchGeoData(city.name));
        }
    }, [city]);

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
    return {
        onChange,
        onClick,
        suggestionsListComponent,
        userInput,
        city,
        filteredSuggestions,
        showSuggestions,
    };
};
export default useAutocomplete;
