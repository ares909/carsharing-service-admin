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

export const authorize = async () => {
    try {
        const response = await axios.post(
            `${baseUrl}/auth/login/oauth`,
            { username, password },
            {
                headers: headersAuth,
            },
        );

        localStorage.setItem("token", JSON.stringify(response.data.refresh_token));
        localStorage.setItem("access_token", JSON.stringify(response.data.access_token));
        return response.data;
    } catch (error) {
        return error;
    }
};

export const refreshToken = async (token) => {
    try {
        const response = await axios.post(
            `${baseUrl}/auth/refresh`,
            { refresh_token: token },
            {
                headers: headersAuth,
            },
        );
        localStorage.setItem("access_token", JSON.stringify(response.data.access_token));
        return response.data;
    } catch (error) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("token");
        return error;
    }
};

export const getCities = async () => {
    try {
        const response = await axios.get(`${baseUrl}/db/city`, { headers: headersInfo });
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getPoints = async (cityId) => {
    try {
        const response = await axios.get(`${baseUrl}/db/point?cityId=${cityId}`, { headers: headersInfo });
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getGeoData = async (city) => {
    try {
        const response = await axios.get(`${yandexUrl}/?format=json&apikey=${yandexApiKey}&geocode=${city}`);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getOnePoint = async (pointId) => {
    try {
        const response = await axios.get(`${baseUrl}/db/point/${pointId}`, { headers: headersInfo });
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getPriceRange = async ({ cityId, pointId }) => {
    try {
        const response = await axios.get(`${baseUrl}/db/order?cityId=${cityId}&pointId=${pointId}`, {
            headers: headersInfo,
        });
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getCar = async (carId) => {
    try {
        const response = await axios.get(`${baseUrl}/db/car/${carId}`, {
            headers: headersInfo,
        });
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getRates = async () => {
    try {
        const response = await axios.get(`${baseUrl}/db/rate`, {
            headers: headersInfo,
        });
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getCars = async () => {
    try {
        const response = await axios.get(`${baseUrl}/db/car`, {
            headers: headersInfo,
        });
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getCategories = async () => {
    try {
        const response = await axios.get(`${baseUrl}/db/category`, {
            headers: headersInfo,
        });
        return response.data;
    } catch (error) {
        return error;
    }
};
