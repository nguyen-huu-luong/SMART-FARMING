import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const getAllRecs = createAsyncThunk(
    "/allrecs",
    async (_, { rejectWithValue }) => {
      try {
        const respone = await api.getAllRecords();
        return respone.data;
      } catch (error) {
        return rejectWithValue(error.respone.data)
      }
    }
  );
  const allRecSlice = createSlice({
    name: "allrecords",
    initialState:{
      datas: [{}],
      loading: false
    },
    extraReducers:{
      [getAllRecs.pending]: (state, action) => {
        state.loading = true
      },    
      [getAllRecs.fulfilled]: (state, action) => {
        state.loading = false
        state.datas = action.payload
      },
      [getAllRecs.rejected]: (state, action) => {
        state.loading = false
        state.error = action.payload.message;
      },
    }
  })

  export default allRecSlice.reducer;