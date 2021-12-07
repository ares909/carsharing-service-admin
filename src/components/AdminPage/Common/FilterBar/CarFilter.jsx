import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import Button from "../../../Common/UI/Button.jsx";
import Filter from "./FilterElement/Filter.jsx";
import { apiAction, resetApiFilters, resetFilteredCars } from "../../../../store/slices/apiSlice";
import { authState, apiData } from "../../../../store/selectors/selectors";
import useFilterList from "../../../../hooks/useFilterList";
import { categoryOptions, modelOptions } from "../../../../constants/carConstants";
import approveButton from "../../../../images/admin/approveButton.svg";
import cancelButton from "../../../../images/admin/cancelButton.svg";
import styles from "./FilterBar.module.scss";

const CarFilter = ({ setCurrentPage }) => {
    const dispatch = useDispatch();
    const { cars, apiFilters, categories } = useSelector(apiData);

    const approveButtonClassName = classNames({
        [`${styles.formButton}`]: true,
        [`${styles.formButtonDisabled}`]: apiFilters.status === "idle",
    });

    const clearButtonClassName = classNames({
        [`${styles.formButtonRed}`]: true,
        [`${styles.formButtonDisabled}`]: apiFilters.status === "idle",
    });

    const buttonImageClassName = classNames({
        [`${styles.formButtonImage}`]: true,
        [`${styles.formButtonImageDisabled}`]: apiFilters.status === "idle",
    });

    const [onModelChange, cityChange, onStatusChange, onCategoryChage] = useFilterList();

    const filterArray = () => {
        const filterModel = (car) => (apiFilters.labels.model ? car.name.includes(apiFilters.labels.model) : true);
        const filterCategory = (car) =>
            apiFilters.labels.category
                ? car.categoryId && car.categoryId.name.includes(apiFilters.labels.category)
                : true;
        const filtered = cars.data.length > 0 && cars.data.filter(filterModel).filter(filterCategory);
        return filtered;
    };
    const handleFilter = () => {
        setCurrentPage(1);
        dispatch(apiAction({ apiFilters: { ...apiFilters, status: "carsFiltered" } }));
        dispatch(apiAction({ filteredCars: filterArray() }));
    };

    const handleResetFilter = () => {
        if (apiFilters.status === "filtered") {
            dispatch(resetApiFilters());
        } else if (apiFilters.status === "carsFiltered") {
            dispatch(resetApiFilters());
            dispatch(resetFilteredCars());
            setCurrentPage(1);
        }
    };

    return (
        <div className={styles.filterBar}>
            <div className={styles.filterContainer}>
                <Filter
                    name="model"
                    placeholder="Модель"
                    options={modelOptions(cars)}
                    onChange={onModelChange}
                    valueState={apiFilters.labels ? apiFilters.labels.model : ""}
                />
                <Filter
                    name="category"
                    placeholder="Категория"
                    options={categoryOptions(categories)}
                    onChange={onCategoryChage}
                    valueState={apiFilters.labels ? apiFilters.labels.category : ""}
                />
            </div>
            <div className={styles.formButtonContainer}>
                <Button
                    name="Применить"
                    onClick={handleFilter}
                    className={approveButtonClassName}
                    disabled={apiFilters.status === "idle"}
                />
                <Button
                    name="Сбросить"
                    onClick={handleResetFilter}
                    className={clearButtonClassName}
                    disabled={apiFilters.status === "idle"}
                />
                <Button onClick={handleFilter} className={buttonImageClassName} disabled={apiFilters.status === "idle"}>
                    <img src={approveButton} />
                </Button>
                <Button
                    onClick={handleResetFilter}
                    className={buttonImageClassName}
                    disabled={apiFilters.status === "idle"}
                >
                    <img src={cancelButton} />
                </Button>
            </div>
        </div>
    );
};

export default CarFilter;
