import { createSlice } from '@reduxjs/toolkit';
import { coursesData } from '../../assets/courses';
import { Course, Lesson } from '../../course';

interface CourseState {
  activeCourses: Course[];
  completedLessons: Lesson[];
  courses: Course[];
  selectedCourse: Course | null;
  selectedLesson: Lesson | null;
}

const courses = coursesData.map(c => ({
  ...c,
  activeLesson: { ...c.lessons[0], completed: false },
  completedLessons: [],
  completed: false,
  lessons: c.lessons.map(l => ({ ...l, completed: false })),
  sinceDate: '',
}));

const initialState: CourseState = {
  activeCourses: [],
  completedLessons: [],
  courses,
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
      setActiveCourse: (state, action) => {
        const newCourse = action.payload;
        const existingCoursesSet = new Set(state.activeCourses);
        existingCoursesSet.add(newCourse);
        state.activeCourses = Array.from(existingCoursesSet);
      },
      setCompletedLessons: (state, action) => {
        state.completedLessons = action.payload;
      },
      setCourses: (state, action) => {
        state.courses = action.payload;
      },
    }
});

export const {
  selectCourse,
  selectLesson,
  setActiveCourse,
  setCompletedLessons,
  setCourses,
} = courseSlice.actions;