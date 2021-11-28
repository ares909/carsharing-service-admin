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
    putOrder,
    deleteOrder,
    getOrderById,
    postChangedOrder,
    putCar,
    postCar,
    postCity,
    postPoint,
    deletePoint,
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
        count: 0,
    },

    statuses: {
        data: [],
        status: "idle",
    },
    selectedCar: {
        data: [],
        status: "idle",
        statusCode: "",
        postStatus: "idle",
    },

    categories: {
        data: [],
        status: "idle",
    },
    order: { data: [], status: "idle", statusCode: "", postStatus: "idle" },
    singleOrder: { data: [], status: "idle", statusCode: "" },
    deletedOrder: { status: "", statusCode: "" },
    ordersData: { data: [], status: "idle", count: 0 },
    apiFilters: {
        status: "idle",
        filters: {},
        labels: {},
    },
    filteredOrders: {
        data: [],
        status: "idle",
    },
    // cars: [],
    filteredCars: [],
    rates: {
        data: [],
        status: "idle",
    },

    city: {
        data: [],
        status: "idle",
        postStatus: "idle",
        statusCode: "",
    },

    point: {
        data: [],
        status: "idle",
        postStatus: "idle",
        statusCode: "",
    },
    orderPrice: 0,
    isFullTank: { value: false, price: 0 },
    isNeedChildChair: { value: false, price: 0 },
    isRightWheel: { value: false, price: 0 },
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
                apiFilters: {
                    status: initialState.apiFilters.status,
                    filters: initialState.apiFilters.filters,
                    labels: initialState.apiFilters.labels,
                },
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

        resetSingleOrder(state) {
            return {
                ...state,
                singleOrder: {
                    data: initialState.singleOrder.data,
                    status: initialState.singleOrder.status,
                    statusCode: initialState.singleOrder.statusCode,
                },
            };
        },

        resetFilteredCars(state) {
            return {
                ...state,
                filteredCars: initialState.filteredCars,
            };
        },

        resetPopupMessage(state) {
            return {
                ...state,
                deletedOrder: {
                    data: initialState.singleOrder.data,
                    status: initialState.singleOrder.status,
                    statusCode: initialState.deletedOrder.statusCode,
                },
                singleOrder: {
                    data: initialState.singleOrder.data,
                    status: initialState.singleOrder.status,
                    statusCode: initialState.singleOrder.statusCode,
                },

                selectedCar: {
                    ...state.selectedCar,
                    postStatus: initialState.selectedCar.postStatus,
                    statusCode: initialState.selectedCar.statusCode,
                },
                order: {
                    ...state.order,
                    postStatus: initialState.postStatus,
                },

                city: {
                    ...state.city,
                    postStatus: initialState.city.postStatus,
                    statusCode: initialState.city.statusCode,
                },

                point: {
                    ...state.point,
                    postStatus: initialState.point.postStatus,
                    statusCode: initialState.point.statusCode,
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
            // // eslint-disable-next-line prefer-destructuring
            // state.formRate = {
            //     name: action.payload.data[0].rateTypeId.name,
            //     id: action.payload.data[0].id,
            //     price: action.payload.data[0].price,
            // };

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
            state.cars.data = action.payload.data.data;
            state.cars.status = "succeeded";
            state.cars.count = action.payload.data.count;
        },

        [changeOrder.fulfilled]: (state, action) => {
            state.singleOrder.data = action.payload.data.data;
            state.singleOrder.status = "approved";
            state.singleOrder.statusCode = action.payload.status;
        },

        [fetchOrder.fulfilled]: (state, action) => {
            state.order.data = action.payload.data.data;
            state.orderPrice = action.payload.data.data.price;
            state.isFullTank.value = action.payload.data.data.isFullTank;
            state.isNeedChildChair.value = action.payload.data.data.isNeedChildChair;
            state.isFullTank.price = action.payload.data.data.isFullTank ? 500 : 0;
            state.isNeedChildChair.price = action.payload.data.data.isNeedChildChair ? 200 : 0;
            state.isRightWheel.value = action.payload.data.data.isRightWheel;
            state.isRightWheel.price = action.payload.data.data.isRightWheel ? 1600 : 0;
            state.order.status = "succeeded";
            state.order.statusCode = action.payload.status;
        },

        [postOrder.fulfilled]: (state, action) => {
            state.order.data = action.payload.data.data;
            state.orderPrice = action.payload.data.data.price;
            state.isFullTank.value = action.payload.data.data.isFullTank;
            state.isNeedChildChair.value = action.payload.data.data.isNeedChildChair;
            state.isFullTank.price = action.payload.data.data.isFullTank ? 500 : 0;
            state.isNeedChildChair.price = action.payload.data.data.isNeedChildChair ? 200 : 0;
            state.isRightWheel.value = action.payload.data.data.isRightWheel;
            state.isRightWheel.price = action.payload.data.data.isRightWheel ? 1600 : 0;
            state.order.status = "succeeded";
            state.order.postStatus = "saved";
            state.order.statusCode = action.payload.status;
        },

        [removeOrder.fulfilled]: (state, action) => {
            state.deletedOrder.data = action.payload.data.data;
            state.deletedOrder.status = "deleted";
            state.deletedOrder.statusCode = action.payload.status;
        },

        [removePoint.fulfilled]: (state, action) => {
            state.point.postStatus = "deleted";
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
            state.selectedCar.data = action.payload.data;
            state.selectedCar.status = "succeeded";
        },
        [changeCar.fulfilled]: (state, action) => {
            state.selectedCar.data = action.payload.data.data;
            state.selectedCar.statusCode = action.payload.status;
            state.selectedCar.status = "succeeded";
            state.selectedCar.postStatus = "saved";
        },

        [createCar.fulfilled]: (state, action) => {
            state.selectedCar.data = action.payload.data.data;
            state.selectedCar.statusCode = action.payload.status;
            state.selectedCar.status = "succeeded";
            state.selectedCar.postStatus = "posted";
        },

        [createCity.fulfilled]: (state, action) => {
            state.city.data = action.payload.data.data;
            state.city.statusCode = action.payload.status;
            state.city.status = "succeeded";
            state.city.postStatus = "posted";
        },

        [createPoint.fulfilled]: (state, action) => {
            state.point.data = action.payload.data.data;
            state.point.statusCode = action.payload.status;
            state.point.status = "succeeded";
            state.point.postStatus = "posted";
        },

        [fetchCities.rejected]: setError,
        [fetchPoints.rejected]: setError,
        [createCity.rejected]: setError,
        [createPoint.rejected]: setError,
        [changeCar.rejected]: setError,
        [createCar.rejected]: setError,
        [fetchRates.rejected]: setError,
        [fetchCars.rejected]: setError,

        [fetchCar.rejected]: setError,
        [fetchStatuses.rejected]: setError,

        [fetchAllOrders.rejected]: setError,
        [changeOrder.rejected]: setError,
        [fetchOrder.rejected]: setError,
        [removeOrder.rejected]: setError,
        [postOrder.rejected]: setError,

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

        [changeOrder.pending]: (state) => {
            state.singleOrder.status = "loading";
        },

        [fetchOrder.pending]: (state) => {
            state.order.status = "loading";
        },

        [removeOrder.pending]: (state) => {
            state.deletedOrder.status = "loading";
        },

        [postOrder.pending]: (state) => {
            state.order.status = "loading";
        },

        [fetchCar.pending]: (state) => {
            state.selectedCar.status = "loading";
        },

        [changeCar.pending]: (state) => {
            state.selectedCar.status = "loading";
        },

        [createCar.pending]: (state) => {
            state.selectedCar.status = "loading";
        },

        [fetchCities.pending]: (state) => {
            state.cities.status = "loading";
        },
        [createCity.pending]: (state) => {
            state.city.status = "loading";
        },

        [createPoint.pending]: (state) => {
            state.point.status = "loading";
        },
    },
});

export const {
    apiAction,
    resetOrder,
    resetError,
    resetApiFilters,
    resetSingleOrder,
    resetDeletedOrder,
    resetPopupMessage,
    resetFilteredCars,
} = apiSlice.actions;
export default apiSlice.reducer;
