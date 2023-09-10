import { configureStore } from '@reduxjs/toolkit';
import { studentSlice } from './student';

export const store = configureStore({
  reducer: {
    student: studentSlice.reducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;