import { Dispatch } from '@reduxjs/toolkit';
import { Lesson } from '../../course';
import { addLesson, deleteLesson } from './lesson-slice';

export const startAddNewLesson = (lesson: Lesson) => {
  return (dispatch: Dispatch) => {
    dispatch(addLesson(lesson));
  };
};

export const startDeleteLesson = (id: number) => {
  return (dispatch: Dispatch) => {
    dispatch(deleteLesson(id));
  };
};