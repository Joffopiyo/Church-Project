import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import dutyReducer from '../features/duties/dutySlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        duties: dutyReducer,
    },
});
