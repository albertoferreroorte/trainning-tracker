import { Course } from '../../course';
import { selectCompletedLessonsForStudentAndCourse, selectCourseLessons, selectCoursesForStudent, selectStudentById, selectStudentCourse, selectStudentCourseCompletedLessons, selectStudentCourses, selectStudentCoursesDetails, selectStudentsWithCoursesAndCompletedLessons } from '../../store';
import { selectAllStudents } from '../../store/student';
import { useAppSelector } from './use-app-selector';

export const useStudents = () => {

  const students = useAppSelector(selectAllStudents);

  const selectedStudentCourseId = useAppSelector(state => state.student.selectedStudentCourseId);

  const selectedStudentCourse = useAppSelector(selectStudentCourse);

  const selectedStudentCourses = useAppSelector(selectStudentCourses);

  const selectedStudentId = useAppSelector(state => state.student.selectedStudentId);

  const selectedStudentLessonIds = useAppSelector(state => state.student.selectedStudentLessonIds);

  const studentCourseCompletedLessons = useAppSelector(selectStudentCourseCompletedLessons);

  const studentCourseLessons = useAppSelector(selectCourseLessons());

  const studentsWithDetails = useAppSelector(selectStudentsWithCoursesAndCompletedLessons);


  return {
    selectedStudentCourse,
    selectedStudentCourseId,
    selectedStudentCourses,
    selectedStudentId,
    selectedStudentLessonIds,
    studentCourseCompletedLessons,
    studentCourseLessons,
    students,
    studentsWithDetails,
  };
}

export const useSelectedStudent = (studentId: number ) => {
  const coursesForStudent = useAppSelector(state => selectCoursesForStudent(state, studentId));
  const selectedStudent = useAppSelector(state => selectStudentById(state, studentId ));
  const studentCoursesDetails: Course[] = useAppSelector(selectStudentCoursesDetails) as Course[];
  return {
    coursesForStudent,
    selectedStudent,
    studentCoursesDetails,
  };
}

export const useCompletedLessons = (studentId: number, courseId: number) => {
  const completedLessons = useAppSelector(state => selectCompletedLessonsForStudentAndCourse(state, studentId, courseId));
  return {
    completedLessons,
  }
}