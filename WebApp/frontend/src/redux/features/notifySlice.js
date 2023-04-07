import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import * as api from '../api'

export const getNotify = createAsyncThunk(
    "/getNotify",
    async(data, {rejectWithValue }) => {
        try {
            const respone = await api.getNotify()
            return respone.data

        }
        catch(err) {
            rejectWithValue(err.respone.data)
        }
    }
)

export const setView = createAsyncThunk(
    "/setView",
    async(data, {rejectWithValue,  dispatch }) => {
        try{
            await api.setView(data)
            await dispatch(getNotify(0))
            return 0
        }
        catch(err) {
            rejectWithValue(err.respone.data)
        }
    }
)

const notifySlice = createSlice({
    name: "notify",
    initialState: {
        data: [],
        loading: false,
        err: "",
        countPre: 0, 
        countAfter: 0,
        firstLoad: false,
        checkLoad: false
    },
    reducers: {
        decrement : (state) => {
            state.countAfter -= 1
            state.countPre -= 1
        },
        setCheck: (state) => {
            state.checkLoad = false
        }
    },
    extraReducers: (buider) => {
        buider
            .addCase(getNotify.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getNotify.fulfilled, (state, action) => {
                state.data = action.payload.data
                state.loading = false
                let sizeData = action.payload.data.length

                if(!state.firstLoad) {
                    state.countPre = action.payload.count
                    state.countAfter = action.payload.count
                }
                else{
                    state.countPre = state.countAfter 
                    state.countAfter = action.payload.count
                }
                if (state.countAfter > state.countPre ) {
                    state.checkLoad = true
                }
                state.firstLoad = true 
            })
            .addCase(getNotify.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message
            })
            .addCase(setView.pending, (state, action) => {
                state.loading = true
            })
            .addCase(setView.fulfilled, (state,action) => {
                state.loading = false
            
            })
            .addCase(setView.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message
            })
    }
})

export const {decrement, setCheck} = notifySlice.actions
export default notifySlice.reducer




