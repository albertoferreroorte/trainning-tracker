import { Dispatch } from '@reduxjs/toolkit';
import { Course, Lesson } from '../../course';
import { addLesson, addNewEmptyCourse, deleteCourseById, deleteLessonById, selectCourse, setActiveCourse, setCompletedLessons, setCourseLessons, setCourses } from './course-slice';

export const addNewEmptyCourseWithNameObjectives = (newCourse: Partial<Course>) => {
  return ( dispatch: Dispatch ) => {
    dispatch( addNewEmptyCourse(newCourse) );
  }
}

export const startAddNewLesson = (lesson: Partial<Lesson>) => {
  return ( dispatch: Dispatch ) => {
    dispatch( addLesson(lesson) );
  }
}

export const startDeleteCourseById = (id: string) => {
  return ( dispatch: Dispatch ) => {
    dispatch( deleteCourseById(id) );
  }
}

export const startDeleteLesson = (id: number) => {
  return ( dispatch: Dispatch ) => {
    dispatch( deleteLessonById(id) );
  }
}

export const startSelectCourse = (course: Partial<Course> | null) => {
  return ( dispatch: Dispatch ) => {
    dispatch( selectCourse(course) );
  }
}

export const startSetActiveCourse = (course: Course) => {
  return ( dispatch: Dispatch ) => {
    dispatch( setActiveCourse(course) );
  }
}

export const startSetCourses = (courses: Partial<Course>[]) => {
  return ( dispatch: Dispatch ) => {
    dispatch( setCourses(courses) );
  }
}

export const startSetCourseLessons = (lessons: Lesson[]) => {
  return ( dispatch: Dispatch ) => {
    dispatch( setCourseLessons(lessons) );
  }
}

export const startSetCompletedLessons = (lessons: Lesson[]) => {
  return ( dispatch: Dispatch ) => {
    dispatch( setCompletedLessons(lessons) );
  }
}