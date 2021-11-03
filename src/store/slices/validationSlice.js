/* eslint-disable no-use-before-define */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    locationValid: false,
    modelValid: false,
    extraValid: false,
    totalValid: false,
};

export const validationSlice = createSlice({
    name: "validation",
    initialState,
    reducers: {
        validityAction(state, action) {
            return { ...state, ...action.payload };
        },
    },
});

export const { validityAction } = validationSlice.actions;
export default validationSlice.reducer;
