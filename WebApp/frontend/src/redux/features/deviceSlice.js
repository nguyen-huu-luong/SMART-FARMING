import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
export const getAllDevices = createAsyncThunk(
  "/devices",
  async (_, { rejectWithValue }) => {
    try {
      const respone = await api.getAllDeviceS();
      return respone.data;
    } catch (error) {
      rejectWithValue(error.respone.data);
    }
  }
);
const deviceSlice = createSlice({
  name: "socket",
  initialState: {
    devices: [],
    loading: false,
    error: null,
  },
  reducers: {
    updateDeviceStatus: (state, action) => {
      let updatedDevices = state.devices.map((item) =>
        item.dev_id == action.payload.id
          ? { ...item, status: action.payload.value }
          : item
      );
      return {...state, devices: updatedDevices}
    },
  },
  extraReducers: {
    [getAllDevices.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllDevices.fulfilled]: (state, action) => {
      state.loading = false;
      state.devices = action.payload;
    },
    [getAllDevices.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { updateDeviceStatus } = deviceSlice.actions;
export default deviceSlice.reducer;
