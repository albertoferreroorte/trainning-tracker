import { Dispatch, Update } from '@reduxjs/toolkit';
import { Course, Lesson } from '../../course';
import { RootState } from '../store';
import { addCourse, addLessonToCourse, deleteCourse, selectCourse, updateCourse } from './course-slice';

export const startAddNewCourse = (course: Course) => {
  return (dispatch: Dispatch) => {
    dispatch(addCourse(course));
  };
};

export const startAddLessonToCourse = (courseId: number, newLesson: Lesson, existingLessonIds: number[]) => {
  return (dispatch: Dispatch, getState: () => RootState) => {
    const course = getState().course.entities[courseId];
    if (course) {
      const lesson = getState().lesson.entities[newLesson.id];
      if (lesson) {
        dispatch(addLessonToCourse({ courseId, lessonId: newLesson.id }));
      }
      existingLessonIds.forEach(lessonId => {
        const existingLesson = getState().lesson.entities[lessonId];
        if (existingLesson) {
          dispatch(addLessonToCourse({ courseId, lessonId }));
        }
      });
    }
  };
};

export const startDeleteCourse = (id: number) => {
  return (dispatch: Dispatch) => {
    dispatch(deleteCourse(id));
  };
};

export const startSelectCourse = (course: number) => {
  return (dispatch: Dispatch) => {
    dispatch(selectCourse(course));
  };
};

export const startUpdateCourse = (course: Partial<Course>) => {
  return (dispatch: Dispatch, getState: () => RootState) => {
    const selectedCourseId = getState().course.selectedCourseId;
    if (selectedCourseId) {
      const updatedCourse: Update<Course> = {
        id: selectedCourseId,
        changes: course,
      };
      dispatch(updateCourse(updatedCourse));
    }
  };
};
