import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authorize, refreshToken } from "../../api/api";

const initialState = {
    token: "",
    refreshToken: "",
    userId: "",
    status: "idle",
    error: "",
};

const setError = (state, action) => {
    state.status = "rejected";
    state.error = action.error.message;
};

export const handleAuth = createAsyncThunk("auth/authSlice", ({ rejectWithValue }) => {
    try {
        return authorize();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const handleRefresh = createAsyncThunk("auth/authSlice", (token, { rejectWithValue }) => {
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
    reducers: {},
    extraReducers: {
        [handleAuth.pending]: (state) => {
            state.status = "loading";
        },
        [handleAuth.fulfilled]: (state, action) => {
            state.status = action.payload.message ? "failed" : "autorized";
            state.token = action.payload.access_token;
            state.refreshToken = action.payload.refresh_token;
            state.userId = action.payload.user_id;
            state.error = action.payload.message;
        },
        [handleAuth.rejected]: setError,
        [handleRefresh.fulfilled]: (state, action) => {
            state.status = action.payload.message ? "failed" : "autorized";
            state.token = action.payload.access_token;
            state.refreshToken = action.payload.refresh_token;
            state.userId = action.payload.user_id;
            state.error = action.payload.message;
        },
        [handleRefresh.rejected]: setError,
    },
});

export default authSlice.reducer;
