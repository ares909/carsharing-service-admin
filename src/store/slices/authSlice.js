import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authorize, refreshToken } from "../../api/api";

const initialState = {
    token: "",
    refreshToken: "",
    userId: "",
    status: "idle",
    error: "",
};

export const handleAuth = createAsyncThunk("auth/authSlice", () => {
    return authorize();
});

export const handleRefresh = createAsyncThunk("auth/authSlice", (token) => {
    return refreshToken(token);
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
        [handleAuth.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.payload.message;
        },
        [handleRefresh.pending]: (state) => {
            state.status = "loading";
        },
        [handleRefresh.fulfilled]: (state, action) => {
            state.status = action.payload.message ? "failed" : "autorized";
            state.token = action.payload.access_token;
            state.refreshToken = action.payload.refresh_token;
            state.userId = action.payload.user_id;
            state.error = action.payload.message;
        },
        [handleRefresh.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.payload.message;
        },
    },
});

export default authSlice.reducer;
