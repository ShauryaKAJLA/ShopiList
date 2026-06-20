import { configureStore } from '@reduxjs/toolkit';
import ListSlice from './ListSlice/ListSlice';


export const store = configureStore({
    reducer: {
        Lists: ListSlice
    }
})