import axios from "axios";
import { useSelector } from "react-redux";
import { url, baseUrl, appId, username, password, appSecret } from "../constants/constants";

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
        const response = await axios.get(`${baseUrl}/db/point/${cityId}`, { headers: headersInfo });
        return response.data;
    } catch (error) {
        return error;
    }
};
