import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPriceRange } from "../../api/api";

const initialState = {
    order: [],
    cars: [],
    pricesMin: [],
    pricesMax: [],
    status: "idle",
    error: "",
};

export const fetchPrices = createAsyncThunk("priceRange/priceRangeSlice", ({ cityId, pointId }) => {
    return getPriceRange({ cityId, pointId });
});

export const priceRangeSlice = createSlice({
    name: "priceRange",
    initialState,
    reducers: {
        resetPriceRange: () => initialState,
    },
    extraReducers: {
        [fetchPrices.pending]: (state) => {
            state.status = "loading";
        },
        [fetchPrices.fulfilled]: (state, action) => {
            state.status = action.payload.message ? "failed" : "succeeded";
            state.order = action.payload.data;
            state.cars = action.payload.data.filter((item) => item.carId);
            state.pricesMin = action.payload.data
                .filter((item) => item.carId)
                .map((item) => item.carId.priceMin)
                .sort((a, b) => (a > b ? 1 : -1));
            state.pricesMax = action.payload.data
                .filter((item) => item.carId)
                .map((item) => item.carId.priceMax)
                .sort((a, b) => (a > b ? 1 : -1));
            state.error = action.payload.message;
        },

        [fetchPrices.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.payload.message;
        },
    },
});

export const { resetChosenPoint } = priceRangeSlice.actions;
export default priceRangeSlice.reducer;
