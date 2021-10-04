import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getGeoData } from "../../api/api";

const initialState = {
    geodataPoints: [],
    status: "idle",
    error: "",
};

export const fetchGeoDataPoints = createAsyncThunk("geodataPoints/geodataPointsSlice", (cityName) => {
    return getGeoData(cityName);
});

export const geodataPointsSlice = createSlice({
    name: "geodataPoints",
    initialState,
    reducers: {
        resetGeodataPoints: () => initialState,
    },
    extraReducers: {
        [fetchGeoDataPoints.pending]: (state) => {
            state.status = "loading";
        },
        [fetchGeoDataPoints.fulfilled]: (state, action) => {
            state.status = action.payload.message ? "failed" : "succeeded";
            state.geodataPoints = [...state.geodataPoints, action.payload.response.GeoObjectCollection];
            state.error = action.payload.message;
        },

        [fetchGeoDataPoints.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.payload.message;
        },
    },
});

export const { resetGeodataPoints } = geodataPointsSlice.actions;
export default geodataPointsSlice.reducer;
