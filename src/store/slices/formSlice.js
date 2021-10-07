import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    city: "",
    point: "",
    car: "",
    extra: "",
    locationValid: false,
    modelValid: false,
    extraValid: false,
    totalValid: false,
};

export const formSlice = createSlice({
    name: "form",
    initialState,
    reducers: {
        formAction(state, action) {
            return { ...state, ...action.payload };
        },
    },
});

export const { formAction } = formSlice.actions;
export default formSlice.reducer;
