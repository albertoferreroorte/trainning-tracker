import { Dispatch } from '@reduxjs/toolkit';
import { Course } from '../../course';
import { selectCourse } from './course-slice';

export const startSelectCourse = (course: Course) => {
  return ( dispatch: Dispatch ) => {
    dispatch( selectCourse(course) );
  }
}
