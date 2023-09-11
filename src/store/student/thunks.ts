import { Dispatch } from '@reduxjs/toolkit';
import { Course } from '../../course';
import { Student } from '../../student/entities';
import { addCourse, addNewEmptyStudent, deleteStudentById, selectStudent, setStudents, updateStudent } from './studentSlice';

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

export const startSetCourses = (course: Course) => {
  return ( dispatch: Dispatch ) => {
    dispatch( addCourse(course) );
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