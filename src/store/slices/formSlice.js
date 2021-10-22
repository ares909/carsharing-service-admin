/* eslint-disable no-use-before-define */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    getCities,
    getPoints,
    getPriceRange,
    getGeoData,
    getCar,
    getRates,
    getCars,
    getCategories,
} from "../../api/api";

const initialState = {
    city: "",
    point: "",
    selectedCar: "",
    formColor: "Любой",
    formRate: "",
    formLength: "",
    price: 0,

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

    categories: { data: [{ id: "Все модели", name: "Все модели" }], status: "idle" },
    order: { data: [], status: "idle" },
    // cars: [],
    filteredCars: [],
    colors: [{ name: "Любой", value: "Любой" }],

    rates: {
        data: [],
        status: "idle",
    },
    isFullTank: { id: "isFullTank", name: "Полный бак", value: "false", price: 500, form: "Нет" },
    isNeedChildChair: { id: "isNeedChildChair", name: "Детское кресло", value: "false", price: 200, form: "Нет" },
    isRightWheel: { id: "isRightWheel", name: "Правый руль", value: "false", price: 1600, form: "Нет" },

    geodata: {
        status: "idle",
        city: "",
        points: "",
        chosenPoint: "",
    },

    pricesMin: [],
    pricesMax: [],
    locationValid: false,
    modelValid: false,
    extraValid: false,
    totalValid: false,
    error: null,
};

const getUniqueObject = (array) => {
    return [...new Map(array.map((item) => [item.id, item])).values()];
};

export const fetchCities = createAsyncThunk("form/fetchCities", (_, { rejectWithValue }) => {
    try {
        return getCities();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const fetchPoints = createAsyncThunk("form/fetchPoints", (cityId, { rejectWithValue }) => {
    try {
        return getPoints(cityId);
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const fetchOrder = createAsyncThunk("form/fetchOrder", ({ cityId, pointId }, rejectWithValue) => {
    try {
        return getPriceRange({ cityId, pointId });
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
export const fetchGeoData = createAsyncThunk("form/fetchGeoData", async (cityName, { rejectWithValue, dispatch }) => {
    try {
        const point = await getGeoData(cityName);
        return dispatch(addCityPoint(point));
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const fetchCar = createAsyncThunk("form/fetchCar", (carId, { rejectWithValue }) => {
    try {
        return getCar(carId);
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const fetchCars = createAsyncThunk("form/fetchCars", (_, { rejectWithValue }) => {
    try {
        return getCars();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const fetchCategories = createAsyncThunk("form/fetchCategories", (_, { rejectWithValue }) => {
    try {
        return getCategories();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const fetchGeoDataPoints = createAsyncThunk(
    "form/fetchGeoDataPoints",
    async (cityName, { rejectWithValue, dispatch }) => {
        try {
            const point = await getGeoData(cityName);
            return dispatch(addPoints(point));
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);

export const fetchChosenPoint = createAsyncThunk(
    "form/fetchChosenPoint",
    async (cityName, { rejectWithValue, dispatch }) => {
        try {
            const point = await getGeoData(cityName);
            return dispatch(addChosenPoint(point));
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);

export const fetchRates = createAsyncThunk("form/fetchRates", (_, { rejectWithValue }) => {
    try {
        return getRates();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const setError = (state, action) => {
    state.status = "rejected";
    state.error = action.payload;
};

export const formSlice = createSlice({
    name: "form",
    initialState,
    reducers: {
        formAction(state, action) {
            return { ...state, ...action.payload };
        },

        resetPoints(state) {
            return {
                ...state,
                points: initialState.points,
                geodata: { city: initialState.geodata.city, points: initialState.geodata.points },
            };
        },

        addCityPoint(state, action) {
            state.geodata.city = action.payload.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
                .split(" ")
                .reverse();
        },

        addPoints(state, action) {
            state.geodata.points = [...state.geodata.points, action.payload.response.GeoObjectCollection];
            // state.geodata.status = "succeeded";
        },

        addChosenPoint(state, action) {
            state.geodata.point = action.payload.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
                .split(" ")
                .reverse();
        },

        resetChosenPoint(state) {
            return {
                ...state,
                geodata: { city: state.geodata.city, points: state.geodata.points, point: initialState.geodata.point },
            };
        },
        resetSelectedCar(state) {
            return {
                ...state,
                selectedCar: initialState.selectedCar,
            };
        },
        filterCars(state, action) {
            return {
                ...state,
                filteredCars: state.cars.data.filter(
                    (car) => car.categoryId !== null && car.categoryId.name === action.payload,
                ),
            };
        },

        filterOrder(state, action) {
            state.colors = [
                ...initialState.colors,
                ...state.selectedCar.colors.map((item) => ({
                    name: item.split("")[0].toUpperCase() + item.split("").slice(1).join(""),
                    value: item.split("")[0].toUpperCase() + item.split("").slice(1).join(""),
                })),
            ];
        },

        resetFilteredCars(state) {
            return {
                ...state,
                filteredCars: initialState.filteredCars,
            };
        },
        // resetOrder(state) {
        //     return {
        //         ...state,
        //         order: {
        //             data: initialState.order.data,
        //             status: initialState.order.status,
        //             cars: initialState.order.cars,
        //         },
        //     };
        // },
    },
    extraReducers: {
        [fetchCities.fulfilled]: (state, action) => {
            state.cities.data = action.payload.data;
            state.cities.status = "succeeded";
        },

        [fetchRates.fulfilled]: (state, action) => {
            state.rates.data = action.payload.data.slice(0, 2);
            state.rates.status = "succeeded";
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

        [fetchOrder.fulfilled]: (state, action) => {
            state.order.data = action.payload.data;
            state.order.status = "succeeded";
        },
        [fetchCar.fulfilled]: (state, action) => {
            state.selectedCar = action.payload.data;
        },

        [fetchCities.rejected]: setError,
        [fetchPoints.rejected]: setError,
        [fetchGeoData.rejected]: setError,
        [fetchRates.rejected]: setError,
        [fetchCars.rejected]: setError,
        [fetchGeoDataPoints.rejected]: setError,
        [fetchChosenPoint.rejected]: setError,
        [fetchCar.rejected]: setError,

        [fetchPoints.pending]: (state) => {
            state.points.status = "loading";
        },
        [fetchCars.pending]: (state) => {
            state.cars.status = "loading";
        },
        [fetchOrder.pending]: (state) => {
            state.order.status = "loading";
        },
    },
});

export const {
    formAction,
    resetPoints,
    addCityPoint,
    addPoints,
    addChosenPoint,
    resetChosenPoint,
    resetSelectedCar,
    filterCars,
    resetOrder,
    resetFilteredCars,
    filterOrder,
} = formSlice.actions;
export default formSlice.reducer;
