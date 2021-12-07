export const cityBlockArray = (city) => [
    {
        label: "Город:",
        data: city.name ? city.name : "нет данных",
    },
];

export const pointBlockArray = (point) => [
    {
        label: "Адрес:",
        data: point.address ? point.address : "нет данных",
    },

    {
        label: "Ориентир:",
        data: point.name ? point.name : "нет данных",
    },
];
