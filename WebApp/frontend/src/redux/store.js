import {configureStore} from '@reduxjs/toolkit';
import recordReducer from './features/recordSlice'
import allRecSlice from './features/allRecSlice';
export default configureStore({
    reducer: {
        enviromentParams: recordReducer,
        datas:  allRecSlice
    },
})
