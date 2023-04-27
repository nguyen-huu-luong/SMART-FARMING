import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const getUserAct = createAsyncThunk(
    "/useract",
    async (time) => {
      try {
        const respone = await api.getUserActivity(time);
        console.log(respone.data)
        return respone.data;
      } catch (error) {
        return console.log(error)
      }
    }
  );
  const userActSlice = createSlice({
    name: "useractivity",
    initialState:{
      useract: [],
      loading: false
    },
    extraReducers:{
      [getUserAct.pending]: (state, action) => {
        state.loading = true
      },    
      [getUserAct.fulfilled]: (state, action) => {
        state.loading = false
        state.useract = action.payload
      },
      [getUserAct.rejected]: (state, action) => {
        state.loading = false
        state.error = action.payload.message;
      },
    }
  })

  export default userActSlice.reducer;