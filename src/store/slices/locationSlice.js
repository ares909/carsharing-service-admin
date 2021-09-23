import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCities, getPoints } from "../../api/api";

const initialState = {
    cities: [],
    points: [],
    status: "idle",
    error: "",
};

export const fetchCities = createAsyncThunk("auth/authSlice", () => {
    return getCities();
});

// export const fetchPoints = createAsyncThunk("auth/authSlice", () => {
//     return getPoints();
// });

export const locationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchCities.pending]: (state) => {
            state.status = "loading";
        },
        [fetchCities.fulfilled]: (state, action) => {
            state.status = action.payload.message ? "failed" : "succeeded";
            state.cities = action.payload.data;
            state.error = action.payload.message;
        },
        [fetchCities.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.payload.message;
        },
        // [fetchPoints.pending]: (state) => {
        //     state.status = "loading";
        // },
        // [fetchPoints.fulfilled]: (state, action) => {
        //     state.status = action.payload.message ? "failed" : "succeeded";
        //     state.points = action.payload;
        //     state.error = action.payload.message;
        // },

        // [fetchPoints.rejected]: (state, action) => {
        //     state.status = "failed";
        //     state.error = action.payload.message;
        // },
    },
});

export default locationSlice.reducer;
