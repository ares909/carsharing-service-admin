import React from "react";
import useAutocomplete from "../../../hooks/useAutocomplete";

// eslint-disable-next-line consistent-return
const Autocomplete = ({ data }) => {
    const { onClick, activeSuggestion, filteredSuggestions, showSuggestions, userInput } = useAutocomplete(data);

    return (
        <ul className="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
                let className;

                // Flag the active suggestion with a class
                if (index === activeSuggestion) {
                    className = "suggestion-active";
                }
                return (
                    <li className={className} key={suggestion} onClick={onClick}>
                        {suggestion}
                    </li>
                );
            })}
        </ul>
    );
};

//     if (showSuggestions && userInput) {
//         if (filteredSuggestions.length) {

//         }
//         return (
//             <div className="no-suggestions">
//                 <em>No suggestions available.</em>
//             </div>
//         );
//     }
// };

export default Autocomplete;
