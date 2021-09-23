import axios from "axios";
import { url, baseUrl, appId, username, password, appSecret } from "../constants/constants";

const headers = {
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
                headers,
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
                headers,
            },
        );
        return response.data;
    } catch (error) {
        return error;
    }
};
