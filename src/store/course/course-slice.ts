import { createSlice } from '@reduxjs/toolkit';
import { courses } from '../../assets/courses';
import { Course, Lesson } from '../../course';

interface CourseState {
  courses: Course[];
  selectedCourse: Course | null;
  selectedLesson: Lesson | null;
}

const initialState: CourseState = {
  courses: courses,
  selectedCourse: null,
  selectedLesson: null,
};

export const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
      selectCourse: (state, action) => {
        state.selectedCourse = action.payload;
      },
      selectLesson: (state, action) => {
        state.selectedLesson = action.payload;
      },
      setCourses: (state, action) => {
        state.courses = action.payload;
      },
    }
});

export const {
  setCourses,
  selectCourse,
  selectLesson,
} = courseSlice.actions;