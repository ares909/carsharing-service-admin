import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    getCities,
    getPoints,
    getCar,
    getRates,
    getCars,
    getCategories,
    getOrderStatuses,
    getAllOrders,
    putOrder,
    deleteOrder,
    getOrderById,
    postChangedOrder,
    putCar,
    postCar,
    postCity,
    postPoint,
    deletePoint,
    deleteCity,
    postRate,
    deleteRate,
} from "../../api/api";

export const fetchCities = createAsyncThunk("api/fetchCities", (_, { rejectWithValue }) => {
    try {
        return getCities();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const fetchPoints = createAsyncThunk("api/fetchPoints", (cityId, { rejectWithValue }) => {
    try {
        return getPoints(cityId);
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const fetchAllOrders = createAsyncThunk("api/fetchAllOrders", ({ token, filters }, rejectWithValue) => {
    try {
        return getAllOrders({ token, filters });
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const removeOrder = createAsyncThunk("api/removeOrder", ({ orderId, statusId }, rejectWithValue) => {
    try {
        return putOrder({ orderId, statusId });
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const changeOrder = createAsyncThunk("api/changeOrder", ({ orderId, statusId }, rejectWithValue) => {
    try {
        return putOrder({ orderId, statusId });
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const postOrder = createAsyncThunk("api/postOrded", ({ orderId, order }, rejectWithValue) => {
    try {
        return postChangedOrder({ orderId, order });
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const fetchOrder = createAsyncThunk("api/fetchOrder", (orderId, rejectWithValue) => {
    try {
        return getOrderById(orderId);
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const fetchCar = createAsyncThunk("api/fetchCar", (carId, { rejectWithValue }) => {
    try {
        return getCar(carId);
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const changeCar = createAsyncThunk("api/changeCar", ({ carId, car, token }, rejectWithValue) => {
    try {
        return putCar({ carId, car, token });
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const createCar = createAsyncThunk("api/createCar", ({ car, token }, rejectWithValue) => {
    try {
        return postCar({ car, token });
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const createCity = createAsyncThunk("api/createCity", ({ city, token }, rejectWithValue) => {
    try {
        return postCity({ city, token });
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const createPoint = createAsyncThunk("api/createPoint", ({ point, cityId, token }, rejectWithValue) => {
    try {
        return postPoint({ point, cityId, token });
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const removePoint = createAsyncThunk("api/deletePoint", ({ pointId, token }, rejectWithValue) => {
    try {
        return deletePoint({ pointId, token });
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const removeCity = createAsyncThunk("api/removeCity", ({ cityId, token }, rejectWithValue) => {
    try {
        return deleteCity({ cityId, token });
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const createRate = createAsyncThunk("api/createRate", ({ rate, token }, rejectWithValue) => {
    try {
        return postRate({ rate, token });
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const removeRate = createAsyncThunk("api/removeRate", ({ rateId, token }, rejectWithValue) => {
    try {
        return deleteRate({ rateId, token });
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const fetchCars = createAsyncThunk("api/fetchCars", (_, rejectWithValue) => {
    try {
        return getCars();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const fetchCategories = createAsyncThunk("api/fetchCategories", (_, { rejectWithValue }) => {
    try {
        return getCategories();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const fetchRates = createAsyncThunk("api/fetchRates", (_, { rejectWithValue }) => {
    try {
        return getRates();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const fetchStatuses = createAsyncThunk("api/fetchStatuses", (_, { rejectWithValue }) => {
    try {
        return getOrderStatuses();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
