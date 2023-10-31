import { selectCourseLessons, selectCoursesForStudent, selectStudentById, selectStudentCourse, selectStudentCourseCompletedLessons, selectStudentCourses, selectStudentsWithCoursesAndCompletedLessons } from '../../store';
import { selectAllStudents } from '../../store/student';
import { useAppSelector } from './use-app-selector';

export const useStudents = () => {

  const students = useAppSelector(selectAllStudents);

  const selectedStudentCourseId = useAppSelector(state => state.student.selectedStudentCourseId);

  const selectedStudentCourse = useAppSelector(selectStudentCourse);

  const selectedStudentCourses = useAppSelector(selectStudentCourses);

  const selectedStudentId = useAppSelector(state => state.student.selectedStudentId);

  const selectedStudentLessonIds = useAppSelector(state => state.student.selectedStudentLessonIds);

  const studentCourseLessons = useAppSelector(selectCourseLessons());

  const studentsWithDetails = useAppSelector(selectStudentsWithCoursesAndCompletedLessons);

  return {
    selectedStudentCourse,
    selectedStudentCourseId,
    selectedStudentCourses,
    selectedStudentId,
    selectedStudentLessonIds,
    studentCourseLessons,
    students,
    studentsWithDetails,
  };
}

export const useSelectedStudent = (studentId: number) => {
  
  const coursesForStudent = useAppSelector(state => selectCoursesForStudent(state, studentId));
  
  const studentCourseCompletedLessons = useAppSelector(state => selectStudentCourseCompletedLessons(state, studentId));
  
  const selectedStudent = useAppSelector(state => selectStudentById(state, studentId ));
  
  return {
    coursesForStudent,
    studentCourseCompletedLessons,
    selectedStudent,
  };
}
