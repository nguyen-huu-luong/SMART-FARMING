import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

// Async actions
export const getEnviromentParams = createAsyncThunk(
  "/records",
  async (_, { rejectWithValue }) => {
    console.log("hello");
    try {
      const respone = await api.getRecords();
      return respone.data;
    } catch (error) {
      return rejectWithValue(error.respone.data)
    }
  }
);

const recordSlice = createSlice({
  name: "record",
  initialState: {
    enviromentParams: [{}, {}, {}],
    error: "",
    loading: false,
  },
  reducers: {
    updateTemperature: (state, action) => {
      let newData = state.enviromentParams;
      newData[0].compare = action.payload.value - newData[0].value;
      newData[0].value = action.payload.value;
      state = { ...state, enviromentParams: newData };
    },

    updateLight: (state, action) => {
      let newData = state.enviromentParams;
      newData[1].compare = action.payload.value - newData[1].value;
      newData[1].value = action.payload.value;
      state = { ...state, enviromentParams: newData };
    },

    updateHumidity: (state, action) => {
      let newData = state.enviromentParams;
      newData[2].compare = action.payload.value - newData[2].value;
      newData[2].value = action.payload.value;
      state = { ...state, enviromentParams: newData };
    },
  },
  extraReducers: {
    [getEnviromentParams.pending]: (state, action) => {
      state.loading = true;
    },
    [getEnviromentParams.fulfilled]: (state, action) => {
      state.loading = false;
      state.enviromentParams = action.payload;
    },
    [getEnviromentParams.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { updateHumidity, updateLight, updateTemperature } =
  recordSlice.actions;
export default recordSlice.reducer;
