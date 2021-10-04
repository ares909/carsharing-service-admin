import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPoints } from "../../api/api";

const initialState = {
    points: [],
    status: "idle",
    error: "",
};

export const fetchPoints = createAsyncThunk("point/pointSlice", (cityId) => {
    return getPoints(cityId);
});

// const addCoordinates = (array) => {
//     console.log(array.map((item) => ({ ...item, coodinates: getGeoData(`${item.cityId.name}, ${item.address}`) })));
// };

export const pointSlice = createSlice({
    name: "point",
    initialState,
    reducers: {
        resetPoints: () => initialState,
    },
    extraReducers: {
        [fetchPoints.pending]: (state) => {
            state.status = "loading";
        },
        [fetchPoints.fulfilled]: (state, action) => {
            state.status = action.payload.message ? "failed" : "succeeded";
            state.points = action.payload.data;
            state.error = action.payload.message;
        },

        [fetchPoints.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.payload.message;
        },
    },
});

export const { resetPoints } = pointSlice.actions;
export default pointSlice.reducer;
