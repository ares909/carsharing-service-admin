import { useState } from "react";

const useFilterList = () => {
    const [filterItem, setFilterItem] = useState({ model: "", city: "", status: "", photo: "" });
    const [filteredData, setFilteredData] = useState([]);
    const { model, city, status, photo } = filterItem;

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
    const onPhotoChange = (option) => {
        if (option) {
            setFilterItem({ ...filterItem, photo: option.value });
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

    return [onModelChange, cityChange, onStatusChange, onPhotoChange, filterData];
};

export default useFilterList;
