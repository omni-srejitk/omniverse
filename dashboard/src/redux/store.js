import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import dataReducer from './features/dataSlice';
import filterReducer from './features/filterSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    data: dataReducer,
    filter: filterReducer,
  },
});
