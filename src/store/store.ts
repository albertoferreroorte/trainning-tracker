import { configureStore } from '@reduxjs/toolkit';
import { courseSlice } from './course/course-slice';
import { studentSlice } from './student';

export const store = configureStore({
  reducer: {
    course: courseSlice.reducer,
    student: studentSlice.reducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;