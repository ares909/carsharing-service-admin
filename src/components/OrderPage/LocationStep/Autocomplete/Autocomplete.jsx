import React, { useState, useEffect, useRef } from "react";
import Select, { createFilter } from "react-select";
import styles from "./Autocomplete.module.scss";

const Autocomplete = ({ onChange, options, valueState, onReset, placeholder, name, isDisabled, labelText }) => {
    const controlWidth = () => {
        if (window.innerWidth > 0 && window.innerWidth <= 767) {
            return "200px";
        }

        return "225px";
    };
    const [width, setWidth] = useState(controlWidth());
    const resizeRef = useRef();

    useEffect(() => {
        const resize = () => resizeRef.current();
        const onResize = window.addEventListener("resize", resize);

        return () => {
            window.removeEventListener("resize", onResize);
        };
    }, []);

    const handleResize = () => setWidth(controlWidth());

    useEffect(() => {
        resizeRef.current = handleResize;
    });

    const customStyles = {
        valueContainer: (provided, state) => ({
            ...provided,
            padding: 0,
            background: state.isDisabled ? "#eeeeee" : "none",
            color: state.isDisabled ? "black" : "gray",
        }),

        option: (provided, state) => ({
            ...provided,
            color: state.isFocused ? "#0EC261" : "gray",
            padding: 8,
            backgroundColor: "white",
            cursor: "pointer",
            fontSize: "14px",
            lineHeight: "16px",
        }),

        control: () => ({
            minHeigth: "25px",
            border: "none",
            borderRadius: "none",
            width: controlWidth(),
            borderBottom: "1px solid gray",
            outline: "none",
            boxShadow: "none",
            borderColor: "gray",
        }),
        indicatorsContainer: () => ({
            display: "none",
        }),
        singleValue: (provided) => ({
            ...provided,

            margin: 0,
            padding: "3px 8px 3px",
        }),
        input: (provided) => ({
            ...provided,
            margin: 0,
            padding: "3px 8px 3px",
        }),

        placeholder: (provided) => ({
            ...provided,
            margin: 0,
            padding: "3px 8px 3px",
        }),
    };

    const filterConfig = {
        ignoreCase: true,
        ignoreAccents: true,
        trim: true,
        matchFrom: "start",
    };

    return (
        <div className={styles.inputContainer}>
            <label className={styles.inputLabel}>{labelText}</label>

            <Select
                // styles={customStyles}
                // classNamePrefix="react-select"
                // className="react-select-container"
                className={styles.input}
                classNamePrefix={styles.input}
                name={name}
                onChange={onChange}
                value={valueState ? options.filter((option) => option.value === valueState) : ""}
                options={options}
                isSearchable={true}
                placeholder={placeholder}
                isDisabled={isDisabled}
                noOptionsMessage={() => "Пункт не найден"}
                filterOption={createFilter(filterConfig)}
            />
            <button
                style={{ backgroundColor: isDisabled ? "#eeeeee" : "white" }}
                name={name}
                onClick={onReset}
                className={styles.inputCrossButton}
            ></button>
        </div>
    );
};

export default Autocomplete;
