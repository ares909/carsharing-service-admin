import React, { useState, useEffect, useRef } from "react";
import Select, { createFilter } from "react-select";
import { useSelector, useDispatch } from "react-redux";
import { authState, apiData } from "../../../../store/selectors/selectors";
import useFilterList from "../../../../hooks/useFilterList";
import Button from "../../../Common/UI/Button.jsx";
import Filter from "./FilterElement/Filter.jsx";
import approveButton from "../../../../images/admin/approveButton.svg";
import cancelButton from "../../../../images/admin/cancelButton.svg";
import styles from "./FilterBar.module.scss";
import { apiAction, fetchAllOrders, resetApiFilters } from "../../../../store/slices/apiSlice";

const FilterBar = ({ token, limit, setCurrentPage }) => {
    const dispatch = useDispatch();
    const { ordersData, cities, cars, statuses, apiFilters } = useSelector(apiData);

    const modelOptions = cars.data
        ? cars.data.map((item) => ({ value: item.name, label: item.name, id: item.id }))
        : [];

    const cityOptions = cities.data
        ? cities.data.map((item) => ({ value: item.name, label: item.name, id: item.id }))
        : [];

    const statusOptions = statuses.data
        ? statuses.data.map((item) => ({ value: item.name, label: item.name, id: item.id }))
        : [];

    const [onModelChange, cityChange, onStatusChange, filterData, filterItem, resetFilters, apiFilter] =
        useFilterList();

    const handleFilter = () => {
        setCurrentPage(1);
        dispatch(fetchAllOrders({ token, filters: { page: 1, limit, ...apiFilters.filters } }));
        dispatch(apiAction({ apiFilters: { ...apiFilters, status: "filtered" } }));
    };

    const handleResetFilter = () => {
        resetFilters();
        dispatch(resetApiFilters());
        setCurrentPage(1);
        dispatch(fetchAllOrders({ token, filters: { page: 1, limit } }));
    };

    return (
        <div className={styles.filterBar}>
            <div className={styles.filterContainer}>
                <Filter
                    name="model"
                    placeholder="Модель"
                    options={modelOptions}
                    onChange={onModelChange}
                    valueState={filterItem.model.name}
                />
                <Filter
                    name="city"
                    placeholder="Город"
                    options={cityOptions}
                    onChange={cityChange}
                    valueState={filterItem.city.name}
                />
                <Filter
                    name="status"
                    placeholder="Статус"
                    options={statusOptions}
                    onChange={onStatusChange}
                    valueState={filterItem.status.name}
                />
            </div>
            <div className={styles.formButtonContainer}>
                <Button name="Применить" onClick={handleFilter} className={styles.formButton} />
                <Button name="Сбросить" onClick={handleResetFilter} className={styles.formButtonRed} />
                <Button onClick={handleFilter} className={styles.formButtonImage}>
                    <img src={approveButton} />
                </Button>
                <Button onClick={handleResetFilter} className={styles.formButtonImage}>
                    <img src={cancelButton} />
                </Button>
            </div>
        </div>
    );
};

export default FilterBar;
