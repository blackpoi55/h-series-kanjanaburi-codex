'use client'
import { createStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers/reducers';

// สร้าง Redux store
export const store = createStore(rootReducer);

// Export store และ persistor
export default store
