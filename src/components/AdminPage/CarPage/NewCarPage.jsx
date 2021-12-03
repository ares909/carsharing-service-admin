import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { fetchCategories, createCar } from "../../../store/actions/apiActions";
import { apiData } from "../../../store/selectors/selectors";
import CarForm from "./CarForm/CarForm.jsx";
import useMapper from "../../../hooks/useMapper";
import useConbertToBase64 from "../../../hooks/useConvertBase64";

const NewCarPage = () => {
    const mapObject = useMapper();
    const token = JSON.parse(localStorage.getItem("access_token"));
    const convertToBase64 = useConbertToBase64();
    const dispatch = useDispatch();
    const { push, goBack } = useHistory();
    const { selectedCar, categories } = useSelector(apiData);
    const [defaultValues, setDefaultValues] = useState({
        name: "",
        number: "",
        category: "",
        priceMin: "",
        priceMax: "",
        colors: [],
    });

    const [colors, setColors] = useState([]);

    const [colorOption, setColorOption] = useState();

    useEffect(() => {
        if (!token) {
            push("/");
        }
    }, [token]);

    useEffect(() => {
        if (categories.status === "idle") {
            dispatch(fetchCategories());
        }
    }, [categories.status]);

    const handleChangeColor = (e) => {
        setColorOption(e.target.value);
    };

    const handleAddColor = (e) => {
        e.preventDefault();
        setColors([...colors, colorOption]);
        setColorOption("");
    };

    const handleDeleteColor = (e) => {
        setColors(colors.filter((color) => e.target.value !== color));
    };

    const handlePostCar = async (data) => {
        const imagePath = await convertToBase64(data.image[0]);
        const values = mapObject({
            dataType: "carFormData",
            data: { ...data, colors, path: imagePath },
        });
        dispatch(
            createCar({
                car: {
                    ...values,
                },
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
            colors={colors}
            setColors={setColors}
            handlePostCar={handlePostCar}
        />
    );
};

export default NewCarPage;
