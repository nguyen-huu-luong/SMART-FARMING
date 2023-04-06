import {configureStore} from '@reduxjs/toolkit';
import recordReducer from './features/recordSlice'
import allRecSlice from './features/allRecSlice';
import deviceSlice from './features/deviceSlice';
import userActivitySlice from './features/userActivitySlice';
import scheduleSlice from './features/scheduleSlice';
export default configureStore({
    reducer: {
        records: recordReducer,
        datas:  allRecSlice,
        devices: deviceSlice,
        data: userActivitySlice,
        schedule: scheduleSlice
    },
})
