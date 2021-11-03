/* eslint-disable no-use-before-define */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    city: "",
    point: "",
    car: "",
    formColor: "Любой",
    formRate: "",
    formLength: "",
    price: 0,
    isFullTank: { id: "isFullTank", name: "Полный бак", value: false, price: 500, form: "Нет" },
    isNeedChildChair: { id: "isNeedChildChair", name: "Детское кресло", value: false, price: 200, form: "Нет" },
    isRightWheel: { id: "isRightWheel", name: "Правый руль", value: false, price: 1600, form: "Нет" },
    error: null,
};

const setError = (state, action) => {
    state.status = "rejected";
    state.error = action.payload;
};

export const formSlice = createSlice({
    name: "form",
    initialState,
    reducers: {
        formAction(state, action) {
            return { ...state, ...action.payload };
        },

        resetExtra(state) {
            return {
                ...state,

                formColor: initialState.formColor,
                formLength: initialState.formLength,
                formRate: initialState.formRate,
                isFullTank: initialState.isFullTank,
                isNeedChildChair: initialState.isNeedChildChair,
                isRightWheel: initialState.isRightWheel,
                price: initialState.price,
            };
        },

        resetForm(state) {
            return {
                ...state,
                city: initialState.city,
                point: initialState.point,
                car: initialState.car,
                formColor: initialState.formColor,
                formLength: initialState.formLength,
                formRate: initialState.formRate,
                isFullTank: initialState.isFullTank,
                isNeedChildChair: initialState.isNeedChildChair,
                isRightWheel: initialState.isRightWheel,
                price: initialState.price,
            };
        },
        resetPoint(state) {
            return {
                ...state,
                point: initialState.point,
                car: initialState.car,
                formColor: initialState.formColor,
                formLength: initialState.formLength,
                formRate: initialState.formRate,
                isFullTank: initialState.isFullTank,
                isNeedChildChair: initialState.isNeedChildChair,
                isRightWheel: initialState.isRightWheel,
                price: initialState.price,
            };
        },

        resetModel(state) {
            return {
                ...state,
                car: initialState.car,
                formColor: initialState.formColor,
                formLength: initialState.formLength,
                formRate: initialState.formRate,
                isFullTank: initialState.isFullTank,
                isNeedChildChair: initialState.isNeedChildChair,
                isRightWheel: initialState.isRightWheel,
                price: initialState.price,
            };
        },
    },
});

export const { formAction, resetForm, resetModel, resetExtra, resetPoint } = formSlice.actions;
export default formSlice.reducer;
