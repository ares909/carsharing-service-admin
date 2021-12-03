import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authorize, refreshToken, register } from "../../api/api";

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
