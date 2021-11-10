import React, { useState, useEffect, useRef } from "react";
import Select, { createFilter } from "react-select";
import { useSelector, useDispatch } from "react-redux";
import { authState, apiData } from "../../../../store/selectors/selectors";
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

    const photoOptions = ["Да", "Нет"].map((item, index) => ({ value: item, label: item, id: index }));

    const filterConfig = {
        ignoreCase: true,
        ignoreAccents: true,
        trim: true,
        matchFrom: "start",
    };

    return (
        <div className={styles.filterBar}>
            <div className={styles.filterContainer}>
                <Filter name="model" placeholder="Модель" options={modelOptions} />
                <Filter name="city" placeholder="Город" options={cityOptions} />
                <Filter name="status" placeholder="Статус" options={statusOptions} />
                <Filter name="photo" placeholder="С фото" options={photoOptions} />
            </div>
            <div>
                <Button name="Применить" />
                <Button name="Сбросить" />
            </div>
        </div>
    );
};

export default FilterBar;
