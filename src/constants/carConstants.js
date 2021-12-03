import useDateFormat from "../hooks/useDateFormat";
import useNumberFormat from "../hooks/useNumberFormat";

const [convertNumber, convertCarNumber] = useNumberFormat();

export const carFirstBlockArray = (car) => [
    {
        label: "Модель:",
        data: car.name ? car.name : "нет данных",
    },
    { label: "Цена от:", data: car.priceMin ? `${convertNumber(car.priceMin)} ₽` : "нет данных" },
    { label: "Цена до:", data: car.priceMax ? `${convertNumber(car.priceMax)} ₽` : "нет данных" },
];

export const carSecondBlockArray = (car) => [
    {
        label: "Топливо:",
        data: car.tank ? `${car.tank} %` : "нет данных",
    },
    { label: "Номер:", data: car.number ? car.number : "нет данных" },
    { label: "Категория:", data: car.categoryId ? car.categoryId.name : "нет данных" },
];

export const carThirdBlockArray = (car) => [
    {
        label: "Описание:",
        data: car.description ? car.description : "нет данных",
    },
];

export const textOptions = (selectedCar) => [
    { title: "Модель: ", data: selectedCar.data.name ? selectedCar.data.name : "нет данных" },
    { title: "Номер: ", data: selectedCar.data.number ? selectedCar.data.number : "нет данных" },
    { title: "Категория: ", data: selectedCar.data.categoryId ? selectedCar.data.categoryId.name : "нет данных" },
    {
        title: "Цена от: ",
        data: selectedCar.data.priceMin ? `${convertNumber(selectedCar.data.priceMin)} ₽` : "нет данных",
    },
    {
        title: "Цена до: ",
        data: selectedCar.data.priceMax ? `${convertNumber(selectedCar.data.priceMax)} ₽` : "нет данных",
    },
    { title: "Топливо ", data: selectedCar.data.tank ? `${selectedCar.data.tank} %` : "нет данных" },

    {
        title: "Описание: ",
        data: selectedCar.data.description ? selectedCar.data.description : "нет данных",
    },
];

export const inputArray = [
    { name: "name", placeholder: "Модель", label: "Модель", id: "name", type: "text" },
    { name: "number", placeholder: "Номер", label: "Номер", id: "number", type: "text" },
    { name: "tank", placeholder: "Топливо", label: "Топливо", id: "tank", type: "text" },
    { name: "priceMin", placeholder: "Цена от", label: "Цена от", id: "priceMin", type: "text" },
    { name: "priceMax", placeholder: "Цена до", label: "Цена до", id: "priceMax", type: "text" },
    { name: "description", placeholder: "Описание", label: "Описание", id: "description", type: "textarea" },
];

export const categoryOptions = (categories) =>
    categories.data.length > 0
        ? categories.data.map((item) => ({ value: item.name, label: item.name, id: item.id }))
        : [];

export const modelOptions = (cars) =>
    cars.data.length > 0 ? cars.data.map((item) => ({ value: item.name, label: item.name, id: item.id })) : [];
