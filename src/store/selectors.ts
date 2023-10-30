import { createSelector } from 'reselect';
import { Course, Lesson } from '../course';
import { calculateCourseProgress } from '../shared/helpers';
import { courseAdapter, } from './course';
import { lessonAdapter } from './lesson';
import { RootState } from './store';
import { studentsAdapter } from './student'; 

const selectCourseState = (state: RootState) => state.course;
const selectLessonState = (state: RootState) => state.lesson;
const selectAllCourses = (state: RootState) => courseAdapter.getSelectors().selectAll(state.course);
const selectAllLessons = (state: RootState) => lessonAdapter.getSelectors().selectAll(state.lesson);
const selectAllStudents = (state: RootState) => studentsAdapter.getSelectors().selectAll(state.student);

const getSelectedStudentId = (state: RootState) => state.student.selectedStudentId;
const getSelectedStudentCourseId = (state: RootState) => state.student.selectedStudentCourseId;

const getStudentCourseLessonIds = (state: RootState) => state.student.studentCourseLessons;
const selectCourseById = (courseId: number) => createSelector(
  selectCourseState,
  (courseState) => courseAdapter.getSelectors().selectById(courseState, courseId)
);

const getStudentEntities = (state: RootState) => state.student.entities;
const getStudentIdFromProps = (_: RootState, studentId: number) => studentId;

export const selectStudentById = createSelector(
  [getStudentEntities, getStudentIdFromProps],
  (students, studentId) => students[studentId]
);

export const selectCourseLessons = () => createSelector(
  selectAllLessons,
  getStudentCourseLessonIds,
  (allLessons, lessonIds) => {
    return allLessons.filter(lesson => lessonIds.includes(lesson.id));
  }
);

export const getCourseDurationFromLessons = (state: RootState, courseId: number) => {
  const course = state.course.entities[courseId];
  if (!course) {
    return 0;
  }
  const totalDuration = course.courseLessonIds.reduce((sum: number, lessonId: number) => {
    const lesson = state.lesson.entities[lessonId];
    if (!lesson) {
      return sum;
    }
    return sum + lesson.duration;
  }, 0);
  return totalDuration;
};

export const selectLessons = (courseId: number) => createSelector(
  selectCourseById(courseId),
  selectLessonState,
  (course, lessonState) => {
    if (!course || !course.courseLessonIds) return [];
    
    return course.courseLessonIds.map(lessonId => {
      return lessonAdapter.getSelectors().selectById(lessonState, lessonId);
    }).filter(Boolean) as Lesson[];
  }
);

export const getNumberOfStudentsCourse = (state: RootState, courseId: number): number => 
  Object.values(state.student.entities).filter(s => s?.courseIds.includes(courseId)).length;

export const getTimesCompletedCourse = (state: RootState, courseId: number) => {
  const course = state.course.entities[courseId];
  if (!course) return 0;
  const lessonsForCourse = course.courseLessonIds;
  if (lessonsForCourse.length === 0) return 0;
  const students = studentsAdapter.getSelectors().selectAll(state.student);
  return students.reduce((acc, student) => {
    const allStudentCompletedLessons = student.completedLessons || [];
    if (lessonsForCourse.every(lessonId => allStudentCompletedLessons[courseId]?.includes(lessonId))) {
      acc += 1;
    }
    return acc;
  }, 0);
};

export const isValidLessonForCourse = (state: RootState, lessonId: number, courseId: number) => {
  const course = courseAdapter.getSelectors().selectById(state.course, courseId);
  if (!course) {
    return false;
  }
  return course.courseLessonIds.includes(lessonId);
};

export const selectCoursesForStudent = createSelector(
  [
    selectAllCourses,
    selectAllLessons,
    selectStudentById,
  ],
  (allCourses, allLessons, student) => {
    if (!student) {
      return [];
    }

    return student.courseIds.map(courseId => {
      const course = allCourses.find(c => c.id === Number(courseId));
      
      if (!course) return undefined;
      const lessonsForCourse = allLessons.filter(lesson => 
        student.studentCourses[course.id]?.includes(lesson.id)
      );
      const completedLessons = lessonsForCourse.filter(lesson => 
        student.completedLessons[course.id]?.includes(lesson.id)
      );
      const courseWithProgress: Course = {
        ...course,
        progress: calculateCourseProgress(lessonsForCourse, completedLessons)
      };

      return courseWithProgress || [];
    });
  }
);

export const selectStudentCourseMap = (state: RootState) => state.course.courseLessonIds;
export const selectStudentCoursesMap = (state: RootState) => state.student.studentCourses;

export const selectStudentCourse = createSelector(
  selectStudentCourseMap,
  getSelectedStudentCourseId,
  (studentCourseMap, courseId) => {
    if (!courseId) return [];
    return studentCourseMap;
  }
);

export const selectStudentCourses = createSelector(
  selectStudentCoursesMap,
  getSelectedStudentId,
  (studentCoursesMap, selectedStudentId) => {
    return selectedStudentId ? studentCoursesMap[selectedStudentId] || {} : {};
  }
);

export const selectStudentSelectedCourse = createSelector(
  selectStudentCoursesMap,
  getSelectedStudentId,
  getNumberOfStudentsCourse,
  (studentCoursesMap, selectedStudentId, selectedStudentCourseId) => {
    return selectedStudentId ? studentCoursesMap[selectedStudentId][selectedStudentCourseId] || {} : {};
  }
);

export const selectStudentCourseCompletedLessons = createSelector(
  [selectAllCourses, getSelectedStudentCourseId, selectAllLessons, selectStudentById,],
  (courses, courseId, lessons, student) => {
    if (!student || !courseId) return [];

    const currentCourse = courses.find(c => c.id === courseId);
    if (!currentCourse || !student.id) return [];

    const studentCompletedLessons = student.completedLessons;
    if (!studentCompletedLessons) return [];

    return currentCourse.courseLessonIds
      .filter(lessonId => student.completedLessons[courseId]?.includes(lessonId))
      .map(lessonId => lessons.find(lesson => lesson.id === lessonId))
      .filter(Boolean);
  }
);

export const selectStudentCoursesDetails = (studentId: number) => createSelector(
    [selectAllCourses, selectAllStudents],
    (courses, students) => {
      const student = students.find(s => s.id === studentId);
      if (!student) return [];
      return student.courseIds.map(courseId =>
        courses.find(course => course.id === courseId)
      ) || [];
    }
);

export const selectStudentCourseLessons = createSelector(
  selectAllLessons,
  selectStudentCourseMap,
  getSelectedStudentCourseId,
  (allLessons, studentCourseMap, courseId) => {
    const lessonIds = studentCourseMap[courseId ?? 0];
    if (!Array.isArray(lessonIds)) return [];
    return lessonIds.map(id => allLessons[id]).filter(Boolean);
  }
);

export const selectStudentsWithCoursesAndCompletedLessons = createSelector(
  [selectAllStudents, selectAllCourses, selectAllLessons],
  (students, courses, lessons) => {
    return students.map(student => {
      const studentCourses = (student.courseIds || [])
        .map(courseId => courses.find(c => c.id === courseId))
        .filter((course): course is Course => Boolean(course));
      const completedLessonsForCourses = studentCourses.reduce<{ [courseId: number]: Lesson[] }>(
        (acc, course) => {
          const allLessonIdsForCourse = student.studentCourses[course.id] || [];
          const completedLessonIdsForCourse = allLessonIdsForCourse.filter(lessonId => student.completedLessons[course.id]?.includes(lessonId));
          acc[course.id] = completedLessonIdsForCourse
            .map(lessonId => lessons.find(l => l.id === lessonId))
            .filter((lesson): lesson is Lesson => Boolean(lesson));
          return acc;
        }, {}
      );
      return {
        ...student,
        courses: studentCourses,
        completedLessonsForCourses
      };
    });
  }
);
