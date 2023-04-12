import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

// Async actions
export const getLight = createAsyncThunk(
    "/getLight",
    async (page, { rejectWithValue }) => {
        try {
            const respone = await api.getLight(page);
            return respone.data;
        } catch (error) { 
            return rejectWithValue(error.respone.data);
        }
    }
);
export const getWater = createAsyncThunk(
    "/getWater",
    async (page, { rejectWithValue }) => {
        try {
            const respone = await api.getWater(page);
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
        totalLight: 0,
        totalWater: 0,
        error: "",
        loading: false,
    },
    extraReducers: {
        [getLight.pending]: (state, action) => {
            state.loading = true;
        },
        [getLight.fulfilled]: (state, action) => {
            state.loading = false;
            state.light = action.payload.data;
            state.totalLight = action.payload.totalPages
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
            state.water = action.payload.data;
            state.totalWater = action.payload.totalPages;
        },
        [getWater.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        }
    },
});

export default thresholdSlice.reducer;
