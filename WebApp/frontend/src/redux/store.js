import {configureStore} from '@reduxjs/toolkit';
import recordReducer from './features/recordSlice'
import allRecSlice from './features/allRecSlice';
import deviceSlice from './features/deviceSlice';
export default configureStore({
    reducer: {
        records: recordReducer,
        datas:  allRecSlice,
        devices: deviceSlice
    },
})
