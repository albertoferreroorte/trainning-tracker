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
      deleteLessonFromCourse: (state, action: PayloadAction<{ courseId: number; lessonId: number }>) => {
        const { courseId, lessonId } = action.payload;
        const course = state.entities[courseId];
        if (course) {
          const lessonIndex = course.courseLessonIds.indexOf(lessonId);
          if (lessonIndex !== -1) {
            course.courseLessonIds.splice(lessonIndex, 1);
          }
        }
      },
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
  deleteLessonFromCourse,
  selectCourse,
  updateCourse,
} = courseSlice.actions;

export const {
  selectAll: selectAllCourses,
  selectById: selectCourseById,
  selectIds: selectCoursesIds,
  selectEntities: selectCourses,
} = courseAdapter.getSelectors((state: RootState) => state.course);