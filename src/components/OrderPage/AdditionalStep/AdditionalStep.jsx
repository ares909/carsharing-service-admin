import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetFilteredCars } from "../../../store/slices/formSlice";

const AdditionalStep = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(resetFilteredCars());
    }, []);

    return <div>3</div>;
};

export default AdditionalStep;
