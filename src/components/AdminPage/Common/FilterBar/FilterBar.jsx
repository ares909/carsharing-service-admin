import React, { useState, useEffect, useRef } from "react";
import Select, { createFilter } from "react-select";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import { authState, apiData } from "../../../../store/selectors/selectors";
import Button from "../../../Common/UI/Button.jsx";
import Filter from "./FilterElement/Filter.jsx";
import { apiAction, fetchAllOrders, resetApiFilters } from "../../../../store/slices/apiSlice";
import useFilterList from "../../../../hooks/useFilterList";
import approveButton from "../../../../images/admin/approveButton.svg";
import cancelButton from "../../../../images/admin/cancelButton.svg";
import styles from "./FilterBar.module.scss";

const FilterBar = ({ token, limit, setCurrentPage }) => {
    const dispatch = useDispatch();
    const { ordersData, cities, cars, statuses, apiFilters } = useSelector(apiData);

    const modelOptions =
        cars.data.length > 0 ? cars.data.map((item) => ({ value: item.name, label: item.name, id: item.id })) : [];

    const cityOptions =
        cities.data.length > 0 ? cities.data.map((item) => ({ value: item.name, label: item.name, id: item.id })) : [];

    const statusOptions =
        statuses.data.length > 0
            ? statuses.data.map((item) => ({ value: item.name, label: item.name, id: item.id }))
            : [];

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

    const handleFilter = () => {
        setCurrentPage(1);
        dispatch(fetchAllOrders({ token, filters: { page: 1, limit, ...apiFilters.filters } }));
        dispatch(apiAction({ apiFilters: { ...apiFilters, status: "ordersFiltered" } }));
    };

    const handleResetFilter = () => {
        if (apiFilters.status === "filtered") {
            dispatch(resetApiFilters());
        } else if (apiFilters.status === "ordersFiltered") {
            dispatch(resetApiFilters());
            setCurrentPage(1);
            dispatch(fetchAllOrders({ token, filters: { page: 1, limit } }));
        }
    };

    return (
        <div className={styles.filterBar}>
            <div className={styles.filterContainer}>
                <Filter
                    name="model"
                    placeholder="Модель"
                    options={modelOptions}
                    onChange={onModelChange}
                    valueState={apiFilters.labels ? apiFilters.labels.model : ""}
                />
                <Filter
                    name="city"
                    placeholder="Город"
                    options={cityOptions}
                    onChange={cityChange}
                    valueState={apiFilters.labels ? apiFilters.labels.city : ""}
                />
                <Filter
                    name="status"
                    placeholder="Статус"
                    options={statusOptions}
                    onChange={onStatusChange}
                    valueState={apiFilters.labels ? apiFilters.labels.status : ""}
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

export default FilterBar;
