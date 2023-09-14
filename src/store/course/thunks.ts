import { Dispatch } from '@reduxjs/toolkit';
import { Course, Lesson } from '../../course';
import { selectCourse, selectLesson, setActiveCourse, setCompletedLessons } from './course-slice';

export const startSelectCourse = (course: Course | null) => {
  return ( dispatch: Dispatch ) => {
    dispatch( selectCourse(course) );
  }
}

export const startSelectLesson = (lesson: Lesson | null) => {
  return ( dispatch: Dispatch ) => {
    dispatch( selectLesson(lesson) );
  }
}

export const startSetActiveCourse = (course: Course) => {
  return ( dispatch: Dispatch ) => {
    dispatch( setActiveCourse(course) );
  }
}

export const startSetCompletedLessons = (lessons: Lesson[]) => {
  return ( dispatch: Dispatch ) => {
    dispatch( setCompletedLessons(lessons) );
  }
}