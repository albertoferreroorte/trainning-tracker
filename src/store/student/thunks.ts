import { Dispatch } from '@reduxjs/toolkit';
import { Student } from '../../student/entities';
import { isValidLessonForCourse } from '../selectors';
import { RootState } from '../store';
import { addStudent, deleteStudent, selectStudentCourse, selectStudentId, selectStudentLessons, setStudentCourseCompletedLessons, setStudentCourseLessons, updateStudent } from './studentSlice';

export const startAddStudent = (student: Student) => {
  return ( dispatch: Dispatch ) => {
    dispatch( addStudent(student) );
  }
}

export const startDeleteStudent = (id: number) => {
  return ( dispatch: Dispatch ) => {
    dispatch( deleteStudent(id) );
  }
}

export const startSelectStudent = (student: number) => {
  return ( dispatch: Dispatch ) => {
    dispatch( selectStudentId(student) );
  }
}

export const startSelectStudentCourse = (course: number) => {
  return ( dispatch: Dispatch ) => {
    dispatch( selectStudentCourse(course) );
  }
}

export const startSelectStudentLessons = (courseId: number, lessons: number[], studentId: number) => {
  return ( dispatch: Dispatch, getState: () => RootState ) => {
    dispatch(selectStudentLessons(lessons));
    const validCompletedLessons = lessons.filter(lessonId => {
      return isValidLessonForCourse(getState(), lessonId, courseId);
    });
    dispatch(setStudentCourseCompletedLessons({
      studentId, courseId, lessonIds: validCompletedLessons
    }));
  }
}

export const startSetStudentCourseLessons = (lessonIds: number[]) => {
  return ( dispatch: Dispatch ) => {
    dispatch( setStudentCourseLessons(lessonIds) );
  }
};

export const startUpdateStudent = (
  id: number,
  courseId: number,
) => {
  return (dispatch: Dispatch, getState: () => RootState) => {
    const state = getState();
    const currentStudent = state.student.entities[id];
    if (!currentStudent) return;
    const { courseIds, completedLessons, studentCourses } = currentStudent;
    const updatedCourseIds = Array.from(new Set([...courseIds, courseId]));
    const currentCourseId = state.student.selectedStudentCourseId;
    if (!currentCourseId) return;
    const lessonIdsForCourse = state.course.entities[currentCourseId]?.courseLessonIds || [];
    const selectedLessonIds = state.student.selectedStudentLessonIds || [];
    const updatedCompletedLessonsForCourse = [...new Set([...(completedLessons[courseId] || []), ...selectedLessonIds])];
    const updatedCompletedLessons = {
      ...completedLessons,
      [courseId]: updatedCompletedLessonsForCourse,
    };
    const updatedStudentCourses = {
      ...studentCourses,
      [courseId]: lessonIdsForCourse,
    };
    dispatch(updateStudent({
      id,
      changes: {
        completedLessons: updatedCompletedLessons,
        courseIds: updatedCourseIds,
        studentCourses: updatedStudentCourses,
      }
    }));
  };
};

