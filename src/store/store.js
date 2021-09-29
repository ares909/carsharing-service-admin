import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import formReducer from "./slices/formSlice";
import locationReducer from "./slices/locationSlice";
import pointReducer from "./slices/pointSlice";
import geodataReducer from "./slices/geodataSlice";
import geodataPointsReducer from "./slices/geodataPointsSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        form: formReducer,
        location: locationReducer,
        point: pointReducer,
        geodata: geodataReducer,
        geodataPoints: geodataPointsReducer,
    },
});

export default store;
