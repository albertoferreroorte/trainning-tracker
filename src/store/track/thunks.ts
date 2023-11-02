import { Dispatch } from '@reduxjs/toolkit';
import { Track } from '../../tracking/entities/track';
import { addTrack } from './track-slice';
import { RootState } from '../store';
import { calculateCourseProgress } from '../../shared/helpers';
import { Lesson } from '../../course';

export const startAddCourseTrack = (name: string) => {
  return (dispatch: Dispatch) => {
    const track = new Track('Created', Date.now(), [{ category: 'Course', name }]);
    dispatch(addTrack(track));
  };
};

export const startAddLessonTrack = (name: string) => {
  return (dispatch: Dispatch) => {
    const track = new Track('Created', Date.now(), [{ category: 'Lesson', name }]);
    dispatch(addTrack(track));
  };
};

export const startAddProgressTrack = (
  courseId: number,
  lessonsIds: number[],
  studentId: number,
) => {
  return (dispatch: Dispatch, getState: () => RootState) => {
    const state = getState();
    const course = state.course.entities[courseId];
    const courseLessonsIds = course?.courseLessonIds;
    const lessons = state.lesson.entities;
    const student = state.student.entities[studentId];
    if (!course || !courseLessonsIds || !student) return;
    const completedLessons: Lesson[] = lessonsIds
      .map(lessonId => lessons[lessonId])
      .filter(lesson => !!lesson) as Lesson[];
    const courseLessons: Lesson[] = courseLessonsIds
      .map(lessonId => lessons[lessonId])
      .filter(lesson => !!lesson) as Lesson[];
    const progressPercentage = calculateCourseProgress(courseLessons, completedLessons);
    const track = new Track('Progress', Date.now(), [
      { category: 'Student', name: student.fullName },
      { category: 'Course', name: `${ course.name } ${ progressPercentage }%` },
    ]);
    dispatch(addTrack(track));
  };
};

export const startAddStudentTrack = (name: string) => {
  return (dispatch: Dispatch) => {
    const track = new Track('Created', Date.now(), [{ category: 'Student', name }]);
    dispatch(addTrack(track));
  };
};

export const startAddStudentCourseTrack = (id: number) => {
  return (dispatch: Dispatch, getState: () => RootState) => {
    const state = getState();
    const studentId = state.student.selectedStudentId;
    const course = state.course.entities[id];
    if (!studentId) return;
    const studentName = state.student.entities[studentId]?.fullName;
    if (!studentName || !course) return;
    const track = new Track('Started', Date.now(), [
      { category: 'Student', name: studentName },
      { category: 'Course', name: course.name },
    ]);
    dispatch(addTrack(track));
  };
};

export const startDeleteCourseTrack = (name: string) => {
  return (dispatch: Dispatch) => {
    const track = new Track('Removed', Date.now(), [{ category: 'Course', name }]);
    dispatch(addTrack(track));
  };
};

export const startDeleteLessonTrack = (id: number) => {
  return (dispatch: Dispatch, getState: () => RootState) => {
    const state = getState();
    const lesson = state.lesson.entities[id];
    if (!lesson) return;
    const track = new Track('Removed', Date.now(), [{ category: 'Lesson', name: lesson.title }]);
    dispatch(addTrack(track));
  };
};

export const startDeleteStudentTrack = (name: string) => {
  return (dispatch: Dispatch) => {
    const track = new Track('Removed', Date.now(), [{ category: 'Student', name }]);
    dispatch(addTrack(track));
  };
};

export const startEditCourseTrack = (name: string) => {
  return (dispatch: Dispatch) => {
    const track = new Track('Edited', Date.now(), [{ category: 'Course', name }]);
    dispatch(addTrack(track));
  };
};

export const startEditStudentTrack = (name: string) => {
  return (dispatch: Dispatch) => {
    const track = new Track('Edited', Date.now(), [{ category: 'Student', name }]);
    dispatch(addTrack(track));
  };
};