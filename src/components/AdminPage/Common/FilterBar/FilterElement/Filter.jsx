import React, { useState, useEffect, useRef } from "react";
import Select, { createFilter } from "react-select";
import styles from "./Filter.module.scss";

const Filter = ({ onChange, options, valueState, placeholder, name }) => {
    const filterConfig = {
        ignoreCase: true,
        ignoreAccents: true,
        trim: true,
        matchFrom: "start",
    };

    return (
        <div className={styles.inputContainer}>
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
        </div>
    );
};

export default Filter;
