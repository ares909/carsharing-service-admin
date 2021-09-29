import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getGeoData } from "../../api/api";

const initialState = {
    geodata: "",
    status: "idle",
    error: "",
};

export const fetchGeoData = createAsyncThunk("geodata/geodataSlice", (cityName) => {
    return getGeoData(cityName);
});

export const geodataSlice = createSlice({
    name: "geodata",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchGeoData.pending]: (state) => {
            state.status = "loading";
        },
        [fetchGeoData.fulfilled]: (state, action) => {
            state.status = action.payload.message ? "failed" : "succeeded";
            state.geodata = action.payload.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
                .split(" ")
                .reverse();
            state.error = action.payload.message;
        },

        [fetchGeoData.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.payload.message;
        },
    },
});

export default geodataSlice.reducer;
