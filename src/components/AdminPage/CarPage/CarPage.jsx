import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchCar, fetchCategories, changeCar } from "../../../store/actions/apiActions";
import { apiData } from "../../../store/selectors/selectors";
import CarForm from "./CarForm/CarForm.jsx";
import useMapper from "../../../hooks/useMapper";
import useConbertToBase64 from "../../../hooks/useConvertBase64";

const CarPage = () => {
    const { carId } = useParams();
    const token = JSON.parse(localStorage.getItem("access_token"));
    const convertToBase64 = useConbertToBase64();
    const dispatch = useDispatch();
    const { selectedCar } = useSelector(apiData);
    const [defaultValues, setDefaultValues] = useState({
        name: "",
        number: "",
        priceMin: "",
        priceMax: "",
        colors: [],
    });

    const [colorOption, setColorOption] = useState();
    const mapObject = useMapper();

    useEffect(() => {
        if (carId) {
            dispatch(fetchCar(carId));
            dispatch(fetchCategories());
        }
    }, [carId]);

    useEffect(() => {
        if (selectedCar.status === "succeeded") {
            const values = mapObject({ dataType: "selectedCarDefaulValues", data: selectedCar.data });
            setDefaultValues({
                ...defaultValues,
                ...values,
            });
        }
    }, [selectedCar.status]);

    const handleChangeColor = (e) => {
        setColorOption(e.target.value);
    };

    const handleAddColor = (e) => {
        e.preventDefault();
        setDefaultValues({ ...defaultValues, colors: [...defaultValues.colors, colorOption] });
    };

    const handleDeleteColor = (e) => {
        setDefaultValues({
            ...defaultValues,
            colors: defaultValues.colors.filter((color) => e.target.value !== color),
        });
    };

    const handlePostCar = async (data) => {
        const imagePath = await convertToBase64(data.image[0]);
        const values = mapObject({
            dataType: "carFormData",
            data: { ...data, colors: defaultValues.colors, path: imagePath },
        });

        dispatch(
            changeCar({
                carId,
                car: {
                    ...values,
                },
                token,
            }),
        );
    };

    return (
        <CarForm
            selectedCar={selectedCar}
            defaultValues={defaultValues}
            handleChangeColor={handleChangeColor}
            handleAddColor={handleAddColor}
            handleDeleteColor={handleDeleteColor}
            colorOption={colorOption}
            handlePostCar={handlePostCar}
        />
    );
};

export default CarPage;
