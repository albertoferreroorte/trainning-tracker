import { Dispatch } from '@reduxjs/toolkit';
import { Course } from '../../course';
import { Student } from '../../student/entities';
import { addNewEmptyStudent, deleteStudentById, selectStudent, selectStudentCourse, setStudents } from './studentSlice';

export const addNewEmptyStudentWithNamePosition = (newStudent: Partial<Student>) => {
  return ( dispatch: Dispatch ) => {
    dispatch( addNewEmptyStudent(newStudent) );
  }
}

export const selectStudentByEntity = (student: Student | null) => {
  return ( dispatch: Dispatch ) => {
    dispatch( selectStudent(student) );
  }
}

export const startDeleteStudentById = (id: number) => {
  return ( dispatch: Dispatch ) => {
    dispatch( deleteStudentById(id) );
  }
}

export const startSelectStudentCourse = (course: Course | null) => {
  return ( dispatch: Dispatch ) => {
    dispatch( selectStudentCourse(course) );
  }
}

export const startSetStudents = (students: Partial<Student>[]) => {
  return ( dispatch: Dispatch ) => {
    dispatch( setStudents(students) );
  }
}