/* eslint-disable no-use-before-define */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCities, getPoints, getPriceRange, getGeoData, getCar } from "../../api/api";

const initialState = {
    city: "",
    point: "",
    car: "",
    cities: {
        data: [],
        status: "idle",
    },
    points: {
        data: [],
        status: "idle",
    },
    order: [],
    cars: [],
    filteredCars: [],
    categories: [],
    selectedCar: "",
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
                filteredCars: state.cars.filter((car) => car.categoryId.name === action.payload),
            };
        },

        // addCities(state, action) {
        //     state.cities = action.payload.data;
        // },
    },
    extraReducers: {
        [fetchCities.fulfilled]: (state, action) => {
            state.cities.data = action.payload.data;
            state.cities.status = "succeeded";
        },
        [fetchPoints.fulfilled]: (state, action) => {
            state.points.data = action.payload.data;
            state.points.status = "succeeded";
        },
        [fetchOrder.fulfilled]: (state, action) => {
            state.order = action.payload.data;
            state.cars = getUniqueObject(action.payload.data.filter((item) => item.carId).map((item) => item.carId));
            state.categories = getUniqueObject(
                getUniqueObject(action.payload.data.filter((item) => item.carId).map((item) => item.carId))
                    .filter((car) => car.categoryId !== null)
                    .map((car) => ({ id: car.categoryId.id, name: car.categoryId.name })),
            );
            // state.categories = getUniqueObject(
            //     action.payload.data.filter((item) => item.carId.categoryId).map((item) => item.categoryId !== null),
            // );

            state.pricesMin = action.payload.data
                .filter((item) => item.carId)
                .map((item) => item.carId.priceMin)
                .sort((a, b) => (a > b ? 1 : -1));
            state.pricesMax = action.payload.data
                .filter((item) => item.carId)
                .map((item) => item.carId.priceMax)
                .sort((a, b) => (a > b ? 1 : -1));
        },
        [fetchCar.fulfilled]: (state, action) => {
            state.selectedCar = action.payload.data;
        },

        [fetchCities.rejected]: setError,
        [fetchPoints.rejected]: setError,
        [fetchGeoData.rejected]: setError,
        [fetchGeoDataPoints.rejected]: setError,
        [fetchChosenPoint.rejected]: setError,
        [fetchCar.rejected]: setError,
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
} = formSlice.actions;
export default formSlice.reducer;
