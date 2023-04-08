import {configureStore} from '@reduxjs/toolkit';
import recordReducer from './features/recordSlice'
import allRecSlice from './features/allRecSlice';
import deviceSlice from './features/deviceSlice';
import userActivitySlice from './features/userActivitySlice';
import scheduleSlice from './features/scheduleSlice';
import thresholdSlice from './features/thresholdSlice';
import notifySlice from './features/notifySlice';
import userSlice from "./features/userSlice"

export default configureStore({
    reducer: {
        records: recordReducer,
        datas:  allRecSlice,
        devices: deviceSlice,
        data: userActivitySlice,
        schedule: scheduleSlice,
        threshold:  thresholdSlice,
        notify: notifySlice,
        user: userSlice
    },
})
