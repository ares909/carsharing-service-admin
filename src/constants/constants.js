export const url = process.env.REACT_APP_PUBLIC_URL || "http://localhost:3000";
export const baseUrl = process.env.REACT_APP_BASE_URL;
export const appId = process.env.REACT_APP_APP_ID;
export const appSecret = process.env.REACT_APP_APP_Secret_Encoded;
export const username = process.env.REACT_APP_APP_LOGIN;
export const password = process.env.REACT_APP_APP_PASS;
export const yandexApiKey = process.env.REACT_APP_YMAPS_API_KEY;
export const yandexUrl = process.env.REACT_APP_YMAPS_URL;
export const secondKey = process.env.REACT_APP_SEC_KEY;
export const imageUrl = process.env.REACT_APP_BASE_URL_IMAGES;
export const pageSize = 5;
export const messages = {
    orderConfirmed: "Успех! Заказ подтвержден",
    orderRemoved: "Успех! Заказ отменен",
    orderSaved: "Успех! Заказ сохранен",
    carChanged: "Успех! Машина изменена",
    carSaved: "Успех! Машина сохранена",
    cityPosted: "Успех! Город сохранен",
    cityChanged: "Успех! Город изменен",
    cityRemoved: "Успех! Город удален",
    pointPosted: "Успех! Адрес сохранен",
    pointDeleted: "Успех! Адрес удален",
    ratePosted: "Успех! Тариф сохранен",
    rateRemoved: "Успех! Тариф удален",
};
export const supprotedFormats = ["image/jpg", "image/jpeg", "image/gif", "image/png", ""];
