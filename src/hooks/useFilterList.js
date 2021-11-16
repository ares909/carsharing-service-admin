import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { apiAction, fetchAllOrders } from "../store/slices/apiSlice";
import { authState, apiData } from "../store/selectors/selectors";

const useFilterList = () => {
    const dispatch = useDispatch();
    const initialFilterState = {
        model: {
            name: "",
            id: "",
        },
        city: {
            name: "",
            id: "",
        },
        status: {
            name: "",
            id: "",
        },
    };

    const initialApiFilter = { carId: undefined, cityId: undefined, orderStatusId: undefined };
    const { apiFilters } = useSelector(apiData);
    const [apiFilter, setApiFilter] = useState(initialApiFilter);
    const initialArray = [];
    const [filterItem, setFilterItem] = useState(initialFilterState);
    // const [filteredData, setFilteredData] = useState(initialArray);
    const { model, city, status } = filterItem;

    const onModelChange = (option) => {
        if (option) {
            setFilterItem({ ...filterItem, model: { name: option.value, id: option.id } });
            dispatch(
                apiAction({ apiFilters: { ...apiFilters, filters: { ...apiFilters.filters, carId: option.id } } }),
            );
        }
    };
    const cityChange = (option) => {
        if (option) {
            setFilterItem({ ...filterItem, city: { name: option.value, id: option.id } });
            dispatch(
                apiAction({ apiFilters: { ...apiFilters, filters: { ...apiFilters.filters, cityId: option.id } } }),
            );
        }
    };
    const onStatusChange = (option) => {
        if (option) {
            setFilterItem({ ...filterItem, status: { name: option.value, id: option.id } });
            dispatch(
                apiAction({
                    apiFilters: { ...apiFilters, filters: { ...apiFilters.filters, orderStatusId: option.id } },
                }),
            );
        }
    };

    const resetFilters = () => {
        setFilterItem(initialFilterState);
        setApiFilter(initialApiFilter);
        dispatch(apiAction({ filteredOrders: { data: initialArray, status: "idle" } }));
    };

    // eslint-disable-next-line consistent-return
    const filterData = () => {
        dispatch(fetchAllOrders());
        // const modelFilter = (order) => {
        //     if (model) {
        //         return order.carId && order.carId.name.includes(model);
        //     }
        //     return true;
        // };
        // const cityFilter = (order) => {
        //     if (city) {
        //         return order.cityId && order.cityId.name.includes(city);
        //     }
        //     return true;
        // };
        // const statusFilter = (order) => {
        //     if (status) {
        //         return order.orderStatusId && order.orderStatusId.name.includes(status);
        //     }
        //     return true;
        // };
        // const res = array.filter(modelFilter).filter(cityFilter).filter(statusFilter);
        // // .filter(statusFilter);
        // dispatch(apiAction({ filteredOrders: { data: res, status: "filtered" } }));
    };

    return [onModelChange, cityChange, onStatusChange, filterData, filterItem, resetFilters, apiFilter];
};

export default useFilterList;
