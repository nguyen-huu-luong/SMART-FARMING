import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import * as api from "../api"

export const authenticate = createAsyncThunk(
    "/authenticate",
    async (data, { rejectWithValue }) => {
        try {
            let respone = await api.authenticate(data)
            return respone.data
        }
        catch (err) {
            alert(err.response.data)
            rejectWithValue(err.respone.data)
        }
    }
)

export const register = createAsyncThunk(
    "/register",
    async (data, { rejectWithValue }) => {
        try {
            await api.register(data)
        }
        catch (err) {
            alert(err.response.data)
            rejectWithValue(err.respone.data)
        }

    }
)

const userSlice = createSlice({
    name: "user",
    initialState: {
        userID: "",
        loading: false,
        registerCheck: false
    },
    reducers: {

    },
    extraReducers: (buider) => {
        (buider)
            .addCase(authenticate.pending, (state, action) => {
                state.loading = true
            })
            .addCase(authenticate.fulfilled, (state, action) => {
                state.loading = false
                state.userID = action.payload.userID
            })
            .addCase(authenticate.rejected, (state, action) => {
                state.loading = false
                state.userID = ""
            })
            .addCase(register.pending, (state, action) => {
                state.loading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false
                state.registerCheck = true
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false
                state.registerCheck = false
            })
    }
})

export default userSlice.reducer