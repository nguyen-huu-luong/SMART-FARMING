import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from '../api'
import { useDispatch } from "react-redux";

export const getThreshold = createAsyncThunk(
    '/getThreshold',
    async(data, {rejectWithValue, dispatch }) => {
        try {
            const respone = await api.getThreshold()
            return respone.data
        }
        catch(err){
            rejectWithValue(err.respone.data)
        }
    }
)

export const updateThreshold = createAsyncThunk(
    '/updateThreshold',
    async(data, {rejectWithValue, dispatch}) => {
        try{
            await api.updateThreshold(data)
            await dispatch(getThreshold(0))
        }
        catch(err) {
            alert(err.response.data)
            rejectWithValue(err.respone.data)
        }
    }
)

const thresholdSlice = createSlice({
    name: "threshold",
    initialState: {
        thresValue: [{}, {}, {}],
        userID: 0,
        loading: false,
        error: ""
    },
    reducers: {
        increment: (state) => {
            state += 1
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getThreshold.pending, (state, action) => {   
                state.loading = true
            })
            .addCase(getThreshold.fulfilled, (state, action) => {
                state.loading = false
                state.thresValue[0] = {min: action.payload[0].minValue, max: action.payload[0].maxValue}
                state.thresValue[1] = {min: action.payload[1].minValue, max: action.payload[1].maxValue}
                state.thresValue[2] = {min: action.payload[2].minValue, max: action.payload[2].maxValue}
                state.userID = action.payload[0].userID
            }) 
            .addCase(getThreshold.rejected, (state, action) => {
                state.error = action.payload.message
            })
            .addCase(updateThreshold.pending, (state, action) => {
                state.loading = true
            })
            .addCase(updateThreshold.fulfilled, (state, action) => {
                state.loading = false
                console.log("Update")
                // let dispatch = useDispatch()
                // dispatch(getThreshold(0))
            })
            .addCase(updateThreshold.rejected, (state, action) => {
                state.loading = false
                // state.error = action.payload.message
            })
    }

    }
)

export const {increment} = thresholdSlice.actions
export default thresholdSlice.reducer