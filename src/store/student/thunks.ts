import { Dispatch } from '@reduxjs/toolkit';
import { Student } from '../../student/entities';
import { addNewEmptyStudent, deleteStudentById, selectStudent, setStudents, updateStudent } from './studentSlice';

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

export const startDeleteStudentById = (id: string) => {
  return ( dispatch: Dispatch ) => {
    dispatch( deleteStudentById(id) );
  }
}

export const startSetStudents = (students: Partial<Student>[]) => {
  return ( dispatch: Dispatch ) => {
    dispatch( setStudents(students) );
  }
}

export const startUpdateStudent = (student: Partial<Student>) => {
  return ( dispatch: Dispatch ) => {
    dispatch( updateStudent(student) );
  }
}