import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import formReducer from "./slices/formSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        form: formReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
