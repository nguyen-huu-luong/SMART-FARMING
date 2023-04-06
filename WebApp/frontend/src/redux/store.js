import {configureStore} from '@reduxjs/toolkit';
import recordReducer from './features/recordSlice'
import allRecSlice from './features/allRecSlice';
import thresholdSlice from './features/thresholdSlice';
import notifySlide from './features/notifySlide';

export default configureStore({
    reducer: {
        enviromentParams: recordReducer,
        datas:  allRecSlice,
        threshold:  thresholdSlice,
        notify: notifySlide
    },
})
