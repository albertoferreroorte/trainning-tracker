import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { Lesson } from '../../course';
import { RootState } from '../store';

export const lessonAdapter = createEntityAdapter<Lesson>();

const initialState = lessonAdapter.getInitialState();

export const lessonSlice = createSlice({
    name: 'lesson',
    initialState,
    reducers: {
      addLesson: lessonAdapter.addOne,
      deleteLesson: lessonAdapter.removeOne,
    }
});

export const {
  addLesson,
  deleteLesson,
} = lessonSlice.actions;

export const {
  selectAll: selectAllLessons,
  selectById: selectLessonById,
  selectEntities: selectLessons,
  selectIds: selectLessonsIds,
} = lessonAdapter.getSelectors((state: RootState) => state.lesson);