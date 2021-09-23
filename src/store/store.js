import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import formReducer from "./slices/formSlice";
import locationReducer from "./slices/locationSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        form: formReducer,
        location: locationReducer,
    },
});

export default store;
