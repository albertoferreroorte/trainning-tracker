import { createSlice } from '@reduxjs/toolkit';
import { Course, Lesson } from '../../course';

interface CourseState {
  activeCourses: Course[];
  completedLessons: Lesson[];
  courseLessons: Lesson[];
  courses: Course[];
  selectedCourse: Course | null;
}

const initialState: CourseState = {
  activeCourses: [],
  completedLessons: [],
  courseLessons: [],
  courses: [],
  selectedCourse: null,
};

export const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
      addLesson: (state, action) => {
        const newLesson = action.payload;
        const existingLessonsSet = new Set(state.courseLessons);
        existingLessonsSet.add(newLesson);
        state.courseLessons = Array.from(existingLessonsSet);
      },
      addNewEmptyCourse: (state, action) => {
        state.courses.push(action.payload);
      },
      deleteCourseById: (state, action) => {
        state.selectedCourse = null;
        state.courses = state.courses.filter(
          course => course.id !== action.payload,
        );
      },
      deleteLessonById: (state, action) => {
        state.courseLessons = state.selectedCourse?.courseLessons.filter(l => l.id !== action.payload) || [];
      },
      selectCourse: (state, action) => {
        state.selectedCourse = action.payload;
      },
      setActiveCourse: (state, action) => {
        const newCourse = action.payload;
        const existingCoursesSet = new Set(state.activeCourses);
        existingCoursesSet.add(newCourse);
        state.activeCourses = Array.from(existingCoursesSet);
      },
      setCompletedLessons: (state, action) => {
        state.completedLessons = [...action.payload];
      },
      setCourseLessons: (state, action) => {
        state.courseLessons = action.payload;
      },
      setCourses: (state, action) => {
        state.courses = action.payload;
      },
    }
});

export const {
  addLesson,
  addNewEmptyCourse,
  deleteCourseById,
  deleteLessonById,
  selectCourse,
  setActiveCourse,
  setCompletedLessons,
  setCourseLessons,
  setCourses,
} = courseSlice.actions;