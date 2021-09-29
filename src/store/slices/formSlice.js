import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    city: "",
    point: "",
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
