import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

// Async actions
export const getLight = createAsyncThunk(
    "/getLight",
    async (_, { rejectWithValue }) => {
        try {
            const respone = await api.getLight();
            return respone.data;
        } catch (error) {
            return rejectWithValue(error.respone.data);
        }
    }
);
export const getWater = createAsyncThunk(
    "/getWater",
    async (_, { rejectWithValue }) => {
        try {
            const respone = await api.getWater();
            return respone.data;
        } catch (error) {
            return rejectWithValue(error.respone.data);
        }
    }
);


export const setSched = createAsyncThunk(
    "/sendSched",
    async (schedule) => {
        const respone = await api.setSchedule(schedule);
        return respone.data;
    }
);

export const deleteSched = createAsyncThunk(
    "/deleteSched",
    async (ids) => {
        const respone = await api.deleteSched(ids);
        return respone.data;
    }
);

export const modifySched = createAsyncThunk(
    "/deleteSched",
    async (infor) => {
        const respone = await api.modifySched(infor);
        return respone.data;
    }
);



export const thresholdSlice = createSlice({
    name: "schedule",
    initialState: {
        light: [],
        water: [],
        error: "",
        loading: false,
    },
    extraReducers: {
        [getLight.pending]: (state, action) => {
            state.loading = true;
        },
        [getLight.fulfilled]: (state, action) => {
            state.loading = false;
            state.light = action.payload;
        },
        [getLight.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [getWater.pending]: (state, action) => {
            state.loading = true;
        },
        [getWater.fulfilled]: (state, action) => {
            state.loading = false;
            state.water = action.payload;
        },
        [getWater.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        }
    },
});

export default thresholdSlice.reducer;
