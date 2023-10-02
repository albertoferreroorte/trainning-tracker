import { createSelector } from 'reselect';
import { Course, Lesson } from '../course';
import { calculateCourseProgress } from '../shared/helpers';
import { Student, StudentCourses } from '../student/entities';
import { courseAdapter, } from './course';
import { lessonAdapter } from './lesson';
import { RootState } from './store';
import { studentsAdapter } from './student'; 

const selectCourseState = (state: RootState) => state.course;
const selectLessonState = (state: RootState) => state.lesson;
const selectStudentState = (state: RootState) => state.student;
const selectAllCourses = (state: RootState) => courseAdapter.getSelectors().selectAll(state.course);
const selectAllLessons = (state: RootState) => lessonAdapter.getSelectors().selectAll(state.lesson);
const selectAllStudents = (state: RootState) => studentsAdapter.getSelectors().selectAll(state.student);

const getAllCourses = (state: RootState) => state.course.entities;
const getAllStudents = (state: RootState) => state.student.entities;
const getSelectedStudentId = (state: RootState) => state.student.selectedStudentId;
const getSelectedStudentCourseId = (state: RootState) => state.student.selectedStudentCourseId;
const getSelectedStudentCourseLessonIds = (state: RootState) => state.student.studentCourseLessons;

const selectCourseById = (courseId: number) => createSelector(
  selectCourseState,
  (courseState) => courseAdapter.getSelectors().selectById(courseState, courseId)
);

const selectLessonById = (lessonId: number) => createSelector(
  selectLessonState,
  (lessonState) => lessonAdapter.getSelectors().selectById(lessonState, lessonId)
);

const getStudentEntities = (state: RootState) => state.student.entities;
const getStudentIdFromProps = (_: RootState, studentId: number) => studentId;

export const selectStudentById = createSelector(
  [getStudentEntities, getStudentIdFromProps],
  (students, studentId) => students[studentId]
);

export const selectCourseLessons = () => createSelector(
  selectAllLessons,
  getSelectedStudentCourseLessonIds,
  (allLessons, selectedLessonIds) => {
    return allLessons.filter(lesson => selectedLessonIds.includes(lesson.id));
  }
);

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

  const students = studentsAdapter.getSelectors().selectAll(state.student);

  return students.reduce((acc, student) => {
    const studentCoursesForStudent = state.student.studentCourses[student.id];
    const studentCompletedLessons = studentCoursesForStudent ? studentCoursesForStudent[courseId.toString()] || [] : [];

    if (student.courseIds.includes(courseId) && lessonsForCourse.every(lessonId => studentCompletedLessons.includes(lessonId))) {
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

const selectStudent = (state: RootState, studentId: number) => state.student.entities[studentId];

export const selectCompletedLessonsForStudentAndCourse = createSelector(
  [selectAllStudents, selectAllLessons, (_, studentId) => studentId, (_, _2, courseId) => courseId],
  (students, lessons, studentId, courseId) => {
    const student = students.find(s => s.id === studentId);
    if (!student || !student.studentCourses || !student.studentCourses[courseId]) {
      return [];
    }
    const lessonIdsForCourse = student.studentCourses[courseId];
    const completedLessonIds = student.completedLessons || [];
    const completedLessonIdsForCourse = lessonIdsForCourse.filter(id => completedLessonIds.includes(id));
    return lessons.filter(lesson => completedLessonIdsForCourse.includes(lesson.id));
  }
);


export const selectCoursesForStudent = createSelector(
  [selectAllCourses, selectAllLessons, selectStudentById],
  (allCourses, allLessons, student) => {
    if (!student || !student.studentCourses) {
      return [];
    }

    return Object.keys(student.studentCourses).map(courseIdStr => {
      const courseId = Number(courseIdStr);
      const course = allCourses.find(c => c.id === courseId);
      if (!course) return undefined;

      const lessonsForCourse = allLessons.filter(lesson => 
        student.studentCourses[courseId]?.includes(lesson.id)
      );

      const completedLessons = lessonsForCourse.filter(lesson => 
        student.completedLessons.includes(lesson.id)
      );

      const courseWithProgress: Course = {
        ...course,
        progress: calculateCourseProgress(lessonsForCourse, completedLessons)
      };

      return courseWithProgress;
    }).filter(Boolean) as Course[];
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
  [selectAllStudents, getSelectedStudentId, selectAllCourses, getSelectedStudentCourseId, selectAllLessons],
  (students, studentId, courses, courseId, lessons) => {
    const student = students.find(s => s.id === studentId);
    if (!student || !courseId) return [];

    const currentCourse = courses[courseId];
    if (!currentCourse || !studentId) return [];

    const studentCoursesForSpecificStudent = student.studentCourses[studentId];
    if (!studentCoursesForSpecificStudent) return [];

    const completedLessonIdsForCurrentCourse = studentCoursesForSpecificStudent[courseId];
    if (!completedLessonIdsForCurrentCourse || completedLessonIdsForCurrentCourse[courseId].length === 0) return [];

    return currentCourse.courseLessonIds
      .filter(lessonId => completedLessonIdsForCurrentCourse[courseId].includes(lessonId))
      .map(lessonId => lessons.find(lesson => lesson.id === lessonId))
      .filter(Boolean) as Lesson[];
  }
);

export const selectStudentCoursesDetails = createSelector(
  [selectAllCourses, selectAllStudents, getSelectedStudentId],
  (courses, students, studentId) => {
    const student = students.find(s => s.id === studentId);
    if (!student) return [];
    return student.courseIds
      .map(courseId => courses[courseId])
      .filter(course => Boolean(course));
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
          const completedLessonIdsForCourse = allLessonIdsForCourse.filter(lessonId => student.completedLessons.includes(lessonId));
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






