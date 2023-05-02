import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const getAllRecs = createAsyncThunk(
    "/allrecs",
    async (page, { rejectWithValue }) => {
      try {
        const respone = await api.getAllRecords(page);
        return respone.data;
      } catch (error) {
        return rejectWithValue(error.respone.data)
      }
    }
  );
  export const getRecsByTime = createAsyncThunk(
    "/allrecsbytime",
    async (time, { rejectWithValue }) => {
      try {
        const respone = await api.getRecordsByTime(time);
        return respone.data;
      } catch (error) {
        return rejectWithValue(error.respone.data)
      }
    }
  );
  const allRecSlice = createSlice({
    name: "allrecords",
    initialState:{
      timeRecords: [],
      datas: [],
      totalPages: 0,
      loading: false
    },
    extraReducers:{
      [getAllRecs.pending]: (state, action) => {
        state.loading = true
      },    
      [getAllRecs.fulfilled]: (state, action) => {
        state.loading = false
        state.datas = action.payload.data
        state.totalPages = action.payload.totalPages
      },
      [getAllRecs.rejected]: (state, action) => {
        state.loading = false
        state.error = action.payload.message;
      },      
      [getRecsByTime.pending]: (state, action) => {
        state.loading = true
      },    
      [getRecsByTime.fulfilled]: (state, action) => {
        state.loading = false
        state.timeRecords = action.payload.data
        state.totalPages = action.payload.totalPages

      },
      [getRecsByTime.rejected]: (state, action) => {
        state.loading = false
        state.error = action.payload.message;
      },
    }
  })

  export default allRecSlice.reducer;