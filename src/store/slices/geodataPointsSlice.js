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
        resetGeodata: () => initialState,
    },
    extraReducers: {
        [fetchGeoDataPoints.pending]: (state) => {
            state.status = "loading";
        },
        [fetchGeoDataPoints.fulfilled]: (state, action) => {
            state.status = action.payload.message ? "failed" : "succeeded";
            state.geodataPoints = [
                ...state.geodataPoints,
                action.payload.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(" ").reverse(),
            ];
            state.error = action.payload.message;
        },

        [fetchGeoDataPoints.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.payload.message;
        },
    },
});

export const { resetGeodata } = geodataPointsSlice.actions;
export default geodataPointsSlice.reducer;
