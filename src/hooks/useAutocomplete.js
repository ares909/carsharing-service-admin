import React, { useState } from "react";

const useAutocomplete = (suggestions) => {
    const [state, setState] = useState({
        activeSuggestion: 0,
        filteredSuggestions: [],
        showSuggestions: false,
        userInput: "",
        cityId: "",
    });

    // const { activeSuggestion, filteredSuggestions, showSuggestions, userInput } = state;

    const onChange = (e) => {
        const userInput = e.currentTarget.value;
        const filteredSuggestions = suggestions.filter(
            (suggestion) => suggestion.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1,
        );

        setState({
            activeSuggestion: 0,
            filteredSuggestions,
            showSuggestions: true,
            userInput,
        });
    };

    const onClick = (e) => {
        const filteredCity = suggestions.find(
            (suggestion) => suggestion.name.toLowerCase() === e.currentTarget.innerText.toLowerCase(),
        );
        setState({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: e.currentTarget.innerText,
            cityId: filteredCity.id,
        });
    };

    const { activeSuggestion, filteredSuggestions, showSuggestions, userInput, cityId } = state;

    let suggestionsListComponent;
    if (showSuggestions && userInput) {
        if (filteredSuggestions.length) {
            suggestionsListComponent = (
                <ul className="suggestions">
                    {filteredSuggestions.map((suggestion, index) => {
                        let className;

                        return (
                            <li className={className} key={suggestion.id} onClick={onClick}>
                                {suggestion.name}
                            </li>
                        );
                    })}
                </ul>
            );
        } else {
            suggestionsListComponent = (
                <div className="no-suggestions">
                    <em>No suggestions available.</em>
                </div>
            );
        }
    }

    return {
        onChange,
        onClick,
        suggestionsListComponent,
        userInput,
        cityId,
    };
};
export default useAutocomplete;
