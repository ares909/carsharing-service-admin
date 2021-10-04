import axios from "axios";
import { useSelector } from "react-redux";
import {
    url,
    baseUrl,
    appId,
    username,
    password,
    appSecret,
    yandexApiKey,
    yandexUrl,
    secondKey,
} from "../constants/constants";

const bearerToken = JSON.parse(localStorage.getItem("token"));

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
        return response.data;
    } catch (error) {
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
        const response = await axios.get(`${yandexUrl}/?format=json&apikey=${secondKey}&geocode=${city}`);
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

// // eslint-disable-next-line consistent-return
// export const getGeoDataTest = async (cityId) => {
//     try {
//         const response = await axios.get(`${baseUrl}/db/point?cityId=${cityId}`, { headers: headersInfo });
//         const result = await response.data.data.map((point) => ({
//             ...point,
//             pos: getGeoData(`${point.cityId.name}, ${point.address}`),
//         }));
//         return { points: response.data, geodata: result };
//     } catch (error) {
//         return error;
//     }
// };
