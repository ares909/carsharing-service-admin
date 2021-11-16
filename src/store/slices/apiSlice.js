/* eslint-disable no-use-before-define */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    getCities,
    getPoints,
    getCar,
    getRates,
    getCars,
    getCategories,
    getOrderStatuses,
    getAllOrders,
} from "../../api/api";

const initialState = {
    cities: {
        data: [],
        status: "idle",
    },
    points: {
        data: [],
        status: "idle",
    },

    cars: {
        data: [],
        status: "idle",
    },
    selectedCar: "",

    categories: { data: [{ id: "Все модели", name: "Все модели" }], status: "idle" },
    order: { data: [], status: "idle", orderId: "" },
    ordersData: { data: [], status: "idle", count: 0 },
    apiFilters: {
        status: "idle",
        filters: {},
    },
    filteredOrders: {
        data: [],
        status: "idle",
    },

    // cars: [],
    filteredCars: [],
    colors: [{ name: "Любой", value: "Любой" }],

    rates: {
        data: [],
        status: "idle",
    },
    statuses: {
        data: [],
        new: "",
        confirmed: "",
        cancelled: "",
        status: "idle",
    },

    geodata: {
        status: "idle",
        city: "",
        points: "",
        chosenPoint: "",
    },

    error: "",
    status: "",
};

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

export const fetchCar = createAsyncThunk("api/fetchCar", (carId, { rejectWithValue }) => {
    try {
        return getCar(carId);
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const fetchCars = createAsyncThunk("api/fetchCars", (_, { rejectWithValue }) => {
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

const setError = (state, action) => {
    state.status = "rejected";
    state.error = action.error.message;
};

export const apiSlice = createSlice({
    name: "api",
    initialState,
    reducers: {
        apiAction(state, action) {
            return { ...state, ...action.payload };
        },

        resetError(state) {
            return {
                ...state,
                error: initialState.error,
                status: initialState.status,
            };
        },

        resetApiFilters(state) {
            return {
                ...state,
                apiFilters: initialState.apiFilters,
            };
        },

        resetOrder(state) {
            return {
                ...state,
                ordersData: {
                    data: initialState.ordersData.data,
                    status: initialState.ordersData.status,
                    count: initialState.ordersData.count,
                },
            };
        },
    },
    extraReducers: {
        [fetchCities.fulfilled]: (state, action) => {
            state.cities.data = action.payload.data;
            state.cities.status = "succeeded";
        },

        [fetchRates.fulfilled]: (state, action) => {
            state.rates.data = action.payload.data.slice(0, 4);
            // eslint-disable-next-line prefer-destructuring
            state.formRate = {
                name: action.payload.data[0].rateTypeId.name,
                id: action.payload.data[0].id,
                price: action.payload.data[0].price,
            };

            state.rates.status = "succeeded";
        },

        [fetchStatuses.fulfilled]: (state, action) => {
            state.statuses.data = action.payload.data;
            state.statuses.status = "succeeded";
        },

        [fetchPoints.fulfilled]: (state, action) => {
            state.points.data = action.payload.data;
            state.points.status = "succeeded";
        },

        [fetchCars.fulfilled]: (state, action) => {
            state.cars.data = action.payload.data;
            state.cars.status = "succeeded";
        },

        [fetchCategories.fulfilled]: (state, action) => {
            state.categories.data = [...initialState.categories.data, ...action.payload.data];
            state.categories.status = "succeeded";
        },

        [fetchAllOrders.fulfilled]: (state, action) => {
            state.ordersData.data = action.payload.data.data;
            state.ordersData.count = action.payload.data.count - 5;
            state.ordersData.status = "succeeded";
        },
        [fetchCar.fulfilled]: (state, action) => {
            state.selectedCar = action.payload.data;
        },

        [fetchCities.rejected]: setError,
        [fetchPoints.rejected]: setError,

        [fetchRates.rejected]: setError,
        [fetchCars.rejected]: setError,

        [fetchCar.rejected]: setError,
        [fetchStatuses.rejected]: setError,

        [fetchAllOrders.rejected]: setError,

        [fetchCities.pending]: (state) => {
            state.points.status = "loading";
        },
        [fetchPoints.pending]: (state) => {
            state.points.status = "loading";
        },
        [fetchRates.pending]: (state) => {
            state.rates.status = "loading";
        },
        [fetchCars.pending]: (state) => {
            state.cars.status = "loading";
        },

        [fetchAllOrders.pending]: (state) => {
            state.ordersData.status = "loading";
        },
    },
});

export const { apiAction, resetOrder, resetError, resetApiFilters } = apiSlice.actions;
export default apiSlice.reducer;
