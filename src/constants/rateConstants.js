import convertNumberFormat from "../utils/convertNumberFormat";

const [convertNumber, convertCarNumber] = convertNumberFormat();

export const ratesBlockArray = (rate) => [
    {
        label: "Тариф:",
        data: rate.rateTypeId && rate.rateTypeId.name ? rate.rateTypeId.name : "нет данных",
    },
    {
        label: "Единица:",
        data: rate.rateTypeId && rate.rateTypeId.unit ? rate.rateTypeId.unit : "нет данных",
    },
    {
        label: "Цена:",
        data: rate.price ? `${convertNumber(rate.price)} ₽` : "нет данных",
    },
];

export const inputArray = [
    {
        name: "tariff",
        type: "text",
        placeholder: "Название",
        id: "tariff",
    },
    {
        name: "unit",
        type: "text",
        placeholder: "Единица",
        id: "unit",
    },
    {
        name: "tariffPrice",
        type: "text",
        placeholder: "Цена",
        id: "tariffPrice",
    },
];
