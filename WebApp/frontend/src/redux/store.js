import {configureStore} from '@reduxjs/toolkit';
import recordReducer from './features/recordSlice'

export default configureStore({
    reducer: {
        enviromentParams: recordReducer
    },
})
