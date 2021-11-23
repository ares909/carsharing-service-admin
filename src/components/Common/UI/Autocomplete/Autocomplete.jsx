import React, { useState, useEffect, useRef } from "react";
import Select, { createFilter } from "react-select";
import styles from "./Autocomplete.module.scss";

const Autocomplete = ({ onChange, options, valueState, onReset, placeholder, name, isDisabled, labelText }) => {
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
