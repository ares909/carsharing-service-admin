import useDateFormat from "../hooks/useDateFormat";
import useNumberFormat from "../hooks/useNumberFormat";

const [convertNumber, convertCarNumber] = useNumberFormat();

const [convertDateToSeconds, secondsToDhms, secondsToMinutes, secondsToHours, stringToLocale, secondsToDays] =
    useDateFormat();

export const orderFirstBlockArray = (order) => [
    {
        label: "Модель:",
        data:
            // eslint-disable-next-line no-nested-ternary
            order.carId
                ? order.carId.name.includes(",")
                    ? order.carId.name.split(" ").slice(1).join(" ")
                    : order.carId.name
                : "нет данных",
    },
    { label: "Город:", data: order.cityId ? order.cityId.name : "нет данных" },
    { label: "Адрес:", data: order.pointId ? order.pointId.address : "нет данных" },
];

export const orderSecondBlockArray = (order) => [
    {
        label: "Срок:",
        data: order.dateFrom && order.dateTo ? secondsToDhms(order.dateTo - order.dateFrom) : "нет данных",
    },
    { label: "Тариф:", data: order.rateId ? order.rateId.rateTypeId.name : "нет данных" },
    { label: "Цена:", data: order.price ? `${convertNumber(order.price)} ₽` : "нет данных" },
];
export const orderThirdBlockArray = (order) => [
    { value: order.isFullTank, name: `Полный бак` },
    { value: order.isNeedChildChair, name: `Детское кресло` },
    { value: order.isRightWheel, name: `Правый руль` },
];

export const cityOptions = (cities) =>
    cities.data.length > 0 ? cities.data.map((item) => ({ value: item.name, label: item.name, id: item.id })) : [];

export const pointOptions = (points) =>
    points.data.length > 0
        ? points.data.map((item) => ({ value: item.address, label: item.address, id: item.id }))
        : [];
export const carOptions = (cars) =>
    cars.data.length > 0 ? cars.data.map((item) => ({ value: item.name, label: item.name, id: item.id })) : [];

export const colorOptions = (order) =>
    order.data.carId
        ? order.data.carId.colors.map((item, index) => ({ value: item, label: item, id: index }))
        : [{ value: "Любой", label: "Любой", id: 1 }];

export const rateOptions = (rates) =>
    rates.data.length > 0
        ? rates.data.map((item) => ({
              value: item.rateTypeId.name,
              label: item.rateTypeId.name,
              id: item.id,
              price: item.price,
          }))
        : [];

export const statusOptions = (statuses) =>
    statuses.data.length > 0 ? statuses.data.map((item) => ({ value: item.name, label: item.name, id: item.id })) : [];

export const tankOptions = [
    { value: true, label: "Да", price: 500 },
    { value: false, label: "Нет", price: 500 },
];

export const chairOptions = [
    { value: true, label: "Да", price: 200 },
    { value: false, label: "Нет", price: 200 },
];

export const wheelOptions = [
    { value: true, label: "Да", price: 1600 },
    { value: false, label: "Нет", price: 1600 },
];

export const textOptions = (order) => [
    { title: "Город: ", data: order.data.cityId ? order.data.cityId.name : "нет данных" },
    { title: "Адрес: ", data: order.data.pointId ? order.data.pointId.address : "нет данных" },
    { title: "Модель: ", data: order.data.carId ? order.data.carId.name : "нет данных" },
    { title: "Цвет: ", data: order.data.color ? order.data.color : "нет данных" },
    { title: "Статус: ", data: order.data.orderStatusId ? order.data.orderStatusId.name : "нет данных" },
    { title: "Цена: ", data: order.data.price ? `${order.data.price} ₽` : "нет данных" },
    {
        title: "Срок: ",
        data:
            order.data.dateFrom && order.data.dateTo
                ? secondsToDhms(order.data.dateTo - order.data.dateFrom)
                : "нет данных",
    },
];

export const inputArray = ({ cities, points, cars, order, rates, statuses }) => [
    { name: "city", placeholder: "Город", label: "Город", id: "city", options: cityOptions(cities) },
    { name: "address", placeholder: "Адрес", label: "Адрес", id: "address", options: pointOptions(points) },
    { name: "car", placeholder: "Модель", label: "Модель", id: "car", options: carOptions(cars) },
    { name: "color", placeholder: "Цвет", label: "Цвет", id: "color", options: colorOptions(order) },
    { name: "rate", placeholder: "Тариф", label: "Тариф", id: "rate", options: rateOptions(rates) },
    { name: "status", placeholder: "Статус", label: "Статус", id: "status", options: statusOptions(statuses) },
    { name: "isFullTank", placeholder: "Полный бак", label: "Полный бак", id: "isFullTank", options: tankOptions },
    {
        name: "isNeedChildChair",
        placeholder: "Детское кресло",
        label: "Детское кресло",
        id: "isNeedChildChair",
        options: chairOptions,
    },
    {
        name: "isRightWheel",
        placeholder: "Правый руль",
        label: "Правый руль",
        id: "isRightWheel",
        options: wheelOptions,
    },
];
