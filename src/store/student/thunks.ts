import { Dispatch } from '@reduxjs/toolkit';
import { Student } from '../../student/entities';
import { addNewEmptyStudent, selectStudent } from './studentSlice';

export const addNewEmptyStudentWithNamePosition = (newStudent: Partial<Student>) => {
  return ( dispatch: Dispatch ) => {
    dispatch( addNewEmptyStudent(newStudent) );
  }
}

export const selectStudentByEntity = (student: Student) => {
  return ( dispatch: Dispatch ) => {
    dispatch( selectStudent(student) );
  }
}
