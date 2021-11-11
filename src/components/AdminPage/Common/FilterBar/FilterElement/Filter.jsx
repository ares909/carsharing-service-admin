import React, { useState, useEffect, useRef } from "react";
import Select, { createFilter } from "react-select";
import styles from "./Filter.module.scss";

const Filter = ({ onChange, options, valueState, onReset, placeholder, name, labelText }) => {
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
                noOptionsMessage={() => "Не найдено"}
                filterOption={createFilter(filterConfig)}
            />
            {/* <button
                style={{ backgroundColor: isDisabled ? "#eeeeee" : "white" }}
                name={name}
                onClick={onReset}
                className={styles.inputCrossButton}
            ></button> */}
        </div>
    );
};

export default Filter;
