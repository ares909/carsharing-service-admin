import axios from "axios";
import { url, baseUrl, appId, username, password, appSecret, yandexApiKey, yandexUrl } from "../constants/constants";

const bearerToken = JSON.parse(localStorage.getItem("access_token"));

const headersInfo = {
    "X-Api-Factory-Application-Id": appId,
    "Content-Type": "application/json",
    Authorization: `Bearer ${bearerToken}`,
};

const headersAuth = {
    "X-Api-Factory-Application-Id": appId,
    "Content-Type": "application/json",
    Authorization: `Basic ${appSecret}`,
};

export const authorize = async (data) => {
    const response = await axios.post(`${baseUrl}/auth/login/oauth`, data, {
        headers: headersAuth,
    });

    localStorage.setItem("token", JSON.stringify(response.data.refresh_token));
    localStorage.setItem("access_token", JSON.stringify(response.data.access_token));
    return response.data;
};

export const register = async (data) => {
    const response = await axios.post(`${baseUrl}/auth/register`, data, {
        headers: headersAuth,
    });
    return response.data;
};

export const refreshToken = async (token) => {
    const response = await axios.post(
        `${baseUrl}/auth/refresh`,
        { refresh_token: token },
        {
            headers: headersAuth,
        },
    );

    localStorage.removeItem("access_token");
    localStorage.setItem("access_token", JSON.stringify(response.data.access_token));
    return response.data;
};

export const getCities = async () => {
    const response = await axios.get(`${baseUrl}/db/city`, { headers: headersInfo });
    return response.data;
};

export const getAllOrders = async ({ token, filters }) => {
    const response = await axios.get(`${baseUrl}/db/order`, {
        headers: {
            "X-Api-Factory-Application-Id": appId,
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        params: filters,
    });
    return response;
};

export const getOrderById = async (orderId) => {
    const response = await axios.get(`${baseUrl}/db/order/${orderId}`, {
        headers: headersInfo,
    });
    return response;
};

export const deleteOrder = async ({ token, orderId }) => {
    const response = await axios.delete(`${baseUrl}/db/order/${orderId}`, {
        headers: {
            "X-Api-Factory-Application-Id": appId,
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
};

export const putOrder = async ({ orderId, statusId }) => {
    const response = await axios.put(
        `${baseUrl}/db/order/${orderId}`,
        {
            orderStatusId: statusId,
        },
        {
            headers: headersInfo,
        },
    );
    return response;
};

export const postChangedOrder = async ({ orderId, order }) => {
    const response = await axios.put(
        `${baseUrl}/db/order/${orderId}`,
        {
            orderStatusId: order.orderStatusId,
            cityId: order.cityId,
            pointId: order.pointId,
            carId: order.carId,
            color: order.color,
            dateFrom: order.dateFrom,
            dateTo: order.dateTo,
            rateId: order.rateId,
            price: order.price,
            isFullTank: order.isFullTank,
            isNeedChildChair: order.isNeedChildChair,
            isRightWheel: order.isRightWheel,
        },
        {
            headers: headersInfo,
        },
    );
    return response;
};

export const getPoints = async (cityId) => {
    const response = await axios.get(`${baseUrl}/db/point?cityId=${cityId}`, { headers: headersInfo });
    return response.data;
};

export const getCar = async (carId) => {
    const response = await axios.get(`${baseUrl}/db/car/${carId}`, {
        headers: headersInfo,
    });
    return response.data;
};

export const getRates = async () => {
    const response = await axios.get(`${baseUrl}/db/rate`, {
        headers: headersInfo,
    });
    return response.data;
};

export const getCars = async () => {
    const response = await axios.get(`${baseUrl}/db/car`, {
        headers: headersInfo,
    });
    return response.data;
};

export const getCategories = async () => {
    const response = await axios.get(`${baseUrl}/db/category`, {
        headers: headersInfo,
    });
    return response.data;
};

export const getOrderStatuses = async () => {
    const response = await axios.get(`${baseUrl}/db/orderStatus`, {
        headers: headersInfo,
    });
    return response.data;
};
