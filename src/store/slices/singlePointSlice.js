import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getOnePoint } from "../../api/api";

const initialState = {
    point: "",
    status: "idle",
    error: "",
};

export const fetchSinglePoint = createAsyncThunk("singlePoint/singlePointSlice", (pointId) => {
    return getOnePoint(pointId);
});

export const singlePointSlice = createSlice({
    name: "singlePoint",
    initialState,
    reducers: {
        resetChosenPoint: () => initialState,
    },
    extraReducers: {
        [fetchSinglePoint.pending]: (state) => {
            state.status = "loading";
        },
        [fetchSinglePoint.fulfilled]: (state, action) => {
            state.status = action.payload.message ? "failed" : "succeeded";
            state.point = action.payload.data;
            state.error = action.payload.message;
        },

        [fetchSinglePoint.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.payload.message;
        },
    },
});

export const { resetChosenPoint } = singlePointSlice.actions;
export default singlePointSlice.reducer;
