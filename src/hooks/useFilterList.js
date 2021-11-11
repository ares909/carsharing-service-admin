import { useState } from "react";

const useFilterList = () => {
    const [filterItem, setFilterItem] = useState({ model: "", city: "", status: "" });
    const [filteredData, setFilteredData] = useState([]);
    const { model, city, status } = filterItem;

    const onModelChange = (option) => {
        if (option) {
            setFilterItem({ ...filterItem, model: option.value });
        }
    };
    const cityChange = (option) => {
        if (option) {
            setFilterItem({ ...filterItem, city: option.value });
        }
    };
    const onStatusChange = (option) => {
        if (option) {
            setFilterItem({ ...filterItem, status: option.value });
        }
    };

    // eslint-disable-next-line consistent-return
    const filterData = (array) => {
        switch (filterItem) {
            case model: {
                const filteredArray = array.filter((item) => (item.carId ? item.carId.name.includes(model) : ""));
                setFilteredData({ ...filterData, filteredArray });
                break;
            }
            default: {
                return array;
            }
        }
    };

    return [onModelChange, cityChange, onStatusChange, filterData, filterItem];
};

export default useFilterList;
