import { Course } from '../../course';
import { Student } from '../../student/entities';

export const getStudentCourses = (student: Student | null, allCourses: Course[]) => {
  if (!student || !student.courses || !allCourses) {
    return [];
  }
  return student.courses.map((studentCourse) => {
    const matchingCourse = allCourses.find((course) => course.id === studentCourse.id);
    if (!matchingCourse) {
      return studentCourse;
    }
    return {
      ...matchingCourse,
      completedLessons: studentCourse.completedLessons,
    };
  });
}