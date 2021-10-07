import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import formReducer from "./slices/formSlice";
import locationReducer from "./slices/locationSlice";
import pointReducer from "./slices/pointSlice";
import geodataReducer from "./slices/geodataSlice";
import geodataPointsReducer from "./slices/geodataPointsSlice";
import singlePointReducer from "./slices/singlePointSlice";
import priceRangeReducer from "./slices/priceRangeSlice";
import carSliecReducer from "./slices/carSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        form: formReducer,
        location: locationReducer,
        point: pointReducer,
        singlePoint: singlePointReducer,
        geodata: geodataReducer,
        geodataPoints: geodataPointsReducer,
        priceRange: priceRangeReducer,
        car: carSliecReducer,
    },
});

export default store;
