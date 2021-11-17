import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "./slices/apiSlice";
import authReducer from "./slices/authSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        api: apiReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
