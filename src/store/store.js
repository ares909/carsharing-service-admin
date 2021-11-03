import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "./slices/apiSlice";
import authReducer from "./slices/authSlice";
import formReducer from "./slices/formSlice";
import validationReducer from "./slices/validationSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        form: formReducer,
        api: apiReducer,
        validation: validationReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
