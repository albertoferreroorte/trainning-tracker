import { createEntityAdapter, createSlice, EntityState, PayloadAction } from '@reduxjs/toolkit';
import { Course } from '../../course';
import { RootState } from '../store';

export interface CourseState extends EntityState<Course> {
  courseLessonIds: number[];
  selectedCourseId: number | null;
}

export const courseAdapter = createEntityAdapter<Course>();

const initialState: CourseState = courseAdapter.getInitialState({
  courseLessonIds: [],
  selectedCourseId: null,
});

export const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
      addCourse: courseAdapter.addOne,
      addLessonToCourse: (state, action: PayloadAction<{courseId: number, lessonId: number}>) => {
        const { courseId, lessonId } = action.payload;
        const course = state.entities[courseId];
        if (course && !course.courseLessonIds.includes(lessonId)) {
          course.courseLessonIds.push(lessonId);
        }
      },
      deleteCourse: courseAdapter.removeOne,
      updateCourse: courseAdapter.updateOne,
      selectCourse: (state, action: PayloadAction<number>) => {
        state.selectedCourseId = action.payload;
      },
    }
});

export const {
  addCourse,
  addLessonToCourse,
  deleteCourse,
  selectCourse,
  updateCourse,
} = courseSlice.actions;

export const {
  selectAll: selectAllCourses,
  selectById: selectCourseById,
  selectIds: selectCoursesIds,
  selectEntities: selectCourses,
} = courseAdapter.getSelectors((state: RootState) => state.course);