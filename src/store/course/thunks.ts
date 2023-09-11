import { Dispatch } from '@reduxjs/toolkit';
import { Course } from '../../course';
import { selectCourse } from './course-slice';

export const startSelectCourse = (course: Course | null) => {
  return ( dispatch: Dispatch ) => {
    dispatch( selectCourse(course) );
  }
}
