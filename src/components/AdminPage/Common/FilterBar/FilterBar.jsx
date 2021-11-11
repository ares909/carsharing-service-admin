import React, { useState, useEffect, useRef } from "react";
import Select, { createFilter } from "react-select";
import { useSelector, useDispatch } from "react-redux";
import { authState, apiData } from "../../../../store/selectors/selectors";
import useFilterList from "../../../../hooks/useFilterList";
import Button from "../../../Common/UI/Button.jsx";
import styles from "./FilterBar.module.scss";
import Filter from "./FilterElement/Filter.jsx";

const FilterBar = () => {
    const { ordersData } = useSelector(apiData);
    const modelOptions = ordersData.data
        ? ordersData.data
              .map((order) => (order.carId ? order.carId.name : "нет данных"))
              .filter((v, i, a) => a.indexOf(v) === i)
              .map((item, index) => ({ value: item, label: item, id: index }))
        : [];

    const cityOptions = ordersData.data
        ? ordersData.data
              .map((order) => (order.cityId ? order.cityId.name : "нет данных"))
              .filter((v, i, a) => a.indexOf(v) === i)
              .map((item, index) => ({ value: item, label: item, id: index }))
        : [];

    const statusOptions = ordersData.data
        ? ordersData.data
              .map((order) => (order.orderStatusId ? order.orderStatusId.name : "нет данных"))
              .filter((v, i, a) => a.indexOf(v) === i)
              .map((item, index) => ({ value: item, label: item, id: index }))
        : [];

    const [onModelChange, cityChange, onStatusChange, filterData, filterItem] = useFilterList();

    return (
        <div className={styles.filterBar}>
            <div className={styles.filterContainer}>
                <Filter
                    name="model"
                    placeholder="Модель"
                    options={modelOptions}
                    onChange={onModelChange}
                    valueState={filterItem.model}
                />
                <Filter
                    name="city"
                    placeholder="Город"
                    options={cityOptions}
                    onChange={cityChange}
                    valueState={filterItem.city}
                />
                <Filter
                    name="status"
                    placeholder="Статус"
                    options={statusOptions}
                    onChange={onStatusChange}
                    valueState={filterItem.status}
                />
            </div>
            <div>
                <Button name="Применить" onClick={() => filterData(ordersData.data)} />
                <Button name="Сбросить" />
            </div>
        </div>
    );
};

export default FilterBar;
