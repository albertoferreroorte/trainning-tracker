import { configureStore } from '@reduxjs/toolkit';
import { courseSlice } from './course/course-slice';
import { lessonSlice } from './lesson';
import { studentSlice } from './student';

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
  reducer: {
    course: courseSlice.reducer,
    lesson: lessonSlice.reducer,
    student: studentSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;