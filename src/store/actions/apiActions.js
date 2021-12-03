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

export const changeCar = createAsyncThunk("api/changeCar", ({ carId, car }, rejectWithValue) => {
    try {
        return putCar({ carId, car });
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const createCar = createAsyncThunk("api/createCar", ({ car }, rejectWithValue) => {
    try {
        return postCar({ car });
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const createCity = createAsyncThunk("api/createCity", ({ city }, rejectWithValue) => {
    try {
        return postCity({ city });
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const createPoint = createAsyncThunk("api/createPoint", ({ point, cityId }, rejectWithValue) => {
    try {
        return postPoint({ point, cityId });
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const removePoint = createAsyncThunk("api/deletePoint", ({ pointId }, rejectWithValue) => {
    try {
        return deletePoint({ pointId });
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const removeCity = createAsyncThunk("api/removeCity", ({ cityId }, rejectWithValue) => {
    try {
        return deleteCity({ cityId });
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const createRate = createAsyncThunk("api/createRate", ({ rate }, rejectWithValue) => {
    try {
        return postRate({ rate });
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const removeRate = createAsyncThunk("api/removeRate", ({ rateId }, rejectWithValue) => {
    try {
        return deleteRate({ rateId });
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
