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
    getOrderStatuses,
    postNewOrder,
    putOrder,
    getOrderById,
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
    ordersData: { data: [], status: "idle" },
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

    error: null,
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

export const fetchOrder = createAsyncThunk("api/fetchOrder", (id, rejectWithValue) => {
    try {
        return getOrderById(id);
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const fetchAllOrders = createAsyncThunk("api/fetchAllOrders", (id, rejectWithValue) => {
    try {
        return getAllOrders();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const postOrder = createAsyncThunk("api/postOrder", (order, rejectWithValue) => {
    try {
        return postNewOrder(order);
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const changeOrder = createAsyncThunk("api/changeOrder", (order, rejectWithValue) => {
    try {
        return putOrder(order);
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const cancelOrder = createAsyncThunk("api/cancelOrder", (order, rejectWithValue) => {
    try {
        return putOrder(order);
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const fetchGeoData = createAsyncThunk("api/fetchGeoData", async (cityName, { rejectWithValue, dispatch }) => {
    try {
        const point = await getGeoData(cityName);
        return dispatch(addCityPoint(point));
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

export const fetchGeoDataPoints = createAsyncThunk(
    "api/fetchGeoDataPoints",
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
    "api/fetchChosenPoint",
    async (cityName, { rejectWithValue, dispatch }) => {
        try {
            const point = await getGeoData(cityName);
            return dispatch(addChosenPoint(point));
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);

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

        resetApiCarExtra(state) {
            return {
                ...state,
                rates: initialState.rates,
                price: initialState.price,
                colors: initialState.colors,
            };
        },
        resetOrder(state) {
            return {
                ...state,
                order: {
                    data: initialState.order.data,
                    status: initialState.order.status,
                    orderId: initialState.order.orderId,
                },
            };
        },

        resetApiData(state) {
            return {
                ...state,
                points: initialState.points,
                selectedCar: initialState.selectedCar,
                order: initialState.order,
                filteredCars: initialState.filteredCars,
                colors: initialState.colors,
                geodata: initialState.geodata,
            };
        },

        resetModelData(state) {
            return {
                ...state,
                selectedCar: initialState.selectedCar,
                order: initialState.order,
                filteredCars: initialState.filteredCars,
                colors: initialState.colors,
                geodata: { city: state.geodata.city, points: state.geodata.points, point: initialState.geodata.point },
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

        [postOrder.fulfilled]: (state, action) => {
            state.order.orderId = action.payload.data.id;
            // state.order.status = "succeeded";
        },

        [changeOrder.fulfilled]: (state, action) => {
            state.order.orderId = action.payload.data.id;
            // state.order.status = "cancelled";
        },

        [fetchOrder.fulfilled]: (state, action) => {
            state.order.data = action.payload.data;
            state.order.orderId = action.payload.data.id;
            state.order.status = "succeeded";
        },

        [fetchAllOrders.fulfilled]: (state, action) => {
            state.ordersData.data = action.payload.data;
            state.ordersData.status = "succeeded";
        },
        [fetchCar.fulfilled]: (state, action) => {
            state.selectedCar = action.payload.data;
        },

        [cancelOrder.fulfilled]: (state, action) => {
            state.order.data = initialState.order;
        },

        [fetchCities.rejected]: setError,
        [fetchPoints.rejected]: setError,
        [fetchGeoData.rejected]: setError,
        [fetchRates.rejected]: setError,
        [fetchCars.rejected]: setError,
        [fetchGeoDataPoints.rejected]: setError,
        [fetchChosenPoint.rejected]: setError,
        [fetchCar.rejected]: setError,
        [fetchStatuses.rejected]: setError,
        [changeOrder.rejected]: setError,
        [fetchOrder.rejected]: setError,
        [cancelOrder.rejected]: setError,
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
        [fetchOrder.pending]: (state) => {
            state.order.status = "loading";
        },
        [fetchAllOrders.pending]: (state) => {
            state.ordersData.status = "loading";
        },
    },
});

export const {
    apiAction,
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
    resetApiCarExtra,
    resetApiData,
    resetModelData,
} = apiSlice.actions;
export default apiSlice.reducer;
