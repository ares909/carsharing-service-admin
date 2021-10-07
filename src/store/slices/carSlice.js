import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCar } from "../../api/api";

const initialState = {
    car: {},
    status: "idle",
    error: "",
};

export const fetchCar = createAsyncThunk("car/carSlice", (carId) => {
    return getCar(carId);
});

export const carSlice = createSlice({
    name: "car",
    initialState,
    extraReducers: {
        [fetchCar.pending]: (state) => {
            state.status = "loading";
        },
        [fetchCar.fulfilled]: (state, action) => {
            state.status = action.payload.message ? "failed" : "succeeded";
            state.car = action.payload.data;
            state.error = action.payload.message;
        },

        [fetchCar.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.payload.message;
        },
    },
});

// export const { resetChosenPoint } = priceRangeSlice.actions;
export default carSlice.reducer;
