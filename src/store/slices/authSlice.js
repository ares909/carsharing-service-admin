import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ref } from "yup";
import { authorize, refreshToken, register } from "../../api/api";

const initialState = {
    token: "",
    refreshToken: "",
    userId: "",
    status: "idle",
    error: "",
    user: {
        username: "",
        password: "",
        id: "",
    },
};

const setError = (state, action) => {
    state.status = "rejected";
    state.error = action.error.message;
};

export const handleAuth = createAsyncThunk("auth/handleAuth", (data, { rejectWithValue }) => {
    try {
        return authorize(data);
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const handleRegister = createAsyncThunk("auth/handleRegister", (data, { rejectWithValue }) => {
    try {
        return register(data);
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const handleRefresh = createAsyncThunk("auth/handleRefresh", (token, { rejectWithValue }) => {
    try {
        return refreshToken(token);
    } catch (error) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("token");
        return rejectWithValue(error.message);
    }
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        resetAuthState(state) {
            return {
                ...state,
                token: initialState.token,
                refreshToken: initialState.refreshToken,
                userId: initialState.userId,
                status: initialState.status,
                error: initialState.error,
                user: initialState.user,
            };
        },
    },
    extraReducers: {
        [handleAuth.pending]: (state) => {
            state.status = "loading";
        },
        [handleRegister.pending]: (state) => {
            state.status = "loading";
        },
        [handleAuth.fulfilled]: (state, action) => {
            state.status = action.payload.message ? "failed" : "authorized";
            state.token = action.payload.access_token;
            state.refreshToken = action.payload.refresh_token;
            state.userId = action.payload.user_id;
            state.error = action.payload.message;
        },
        [handleRegister.fulfilled]: (state, action) => {
            state.status = action.payload.message ? "failed" : "registered";
            state.user.username = action.payload.username;
            state.user.password = action.payload.password;
            state.user.id = action.payload.id;
        },
        [handleAuth.rejected]: setError,
        [handleRegister.rejected]: setError,
        [handleRefresh.fulfilled]: (state, action) => {
            state.status = action.payload.message ? "failed" : "authorized";
            state.token = action.payload.access_token;
            state.refreshToken = action.payload.refresh_token;
            state.userId = action.payload.user_id;
            state.error = action.payload.message;
        },
        [handleRefresh.rejected]: setError,
    },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
