import useDateFormat from "../hooks/useDateFormat";
import useNumberFormat from "../hooks/useNumberFormat";

const [convertNumber, convertCarNumber] = useNumberFormat();

const [convertDateToSeconds, secondsToDhms, secondsToMinutes, secondsToHours, stringToLocale, secondsToDays] =
    useDateFormat();

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
