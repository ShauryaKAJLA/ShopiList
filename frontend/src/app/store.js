import { configureStore } from '@reduxjs/toolkit';
import ListSlice from './ListSlice/ListSlice';
import { ApiSlice } from './api/ApiSlice';


export const store = configureStore({
    reducer: {
        Lists: ListSlice,
        [ApiSlice.reducerPath]: ApiSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(ApiSlice.middleware),
});