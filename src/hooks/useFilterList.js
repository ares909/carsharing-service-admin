import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { apiAction, fetchAllOrders } from "../store/slices/apiSlice";
import { authState, apiData } from "../store/selectors/selectors";

const useFilterList = () => {
    const dispatch = useDispatch();
    const { apiFilters } = useSelector(apiData);

    const onModelChange = (option) => {
        if (option) {
            dispatch(
                apiAction({
                    apiFilters: {
                        ...apiFilters,
                        status: "filtered",
                        filters: { ...apiFilters.filters, carId: option.id },
                        labels: { ...apiFilters.labels, model: option.value },
                    },
                }),
            );
        }
    };
    const cityChange = (option) => {
        if (option) {
            dispatch(
                apiAction({
                    apiFilters: {
                        ...apiFilters,
                        status: "filtered",
                        filters: { ...apiFilters.filters, cityId: option.id },
                        labels: { ...apiFilters.labels, city: option.value },
                    },
                }),
            );
        }
    };
    const onStatusChange = (option) => {
        if (option) {
            dispatch(
                apiAction({
                    apiFilters: {
                        ...apiFilters,
                        status: "filtered",
                        filters: { ...apiFilters.filters, orderStatusId: option.id },
                        labels: { ...apiFilters.labels, status: option.value },
                    },
                }),
            );
        }
    };

    const onCategoryChage = (option) => {
        if (option) {
            dispatch(
                apiAction({
                    apiFilters: {
                        ...apiFilters,
                        status: "filtered",
                        filters: { ...apiFilters.filters, categoryId: option.id },
                        labels: { ...apiFilters.labels, category: option.value },
                    },
                }),
            );
        }
    };

    return [onModelChange, cityChange, onStatusChange, onCategoryChage];
};

export default useFilterList;
