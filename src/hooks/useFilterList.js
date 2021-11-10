import { useState } from "react";

const useFilterList = () => {
    const [filterItem, setFilterItem] = useState({ model: "", city: "", status: "", photo: "" });
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

    // const filterData = (array) => {
    //     switch
    // }
};

export default useFilterList;
