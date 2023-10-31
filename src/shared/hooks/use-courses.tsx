import { RootState, getCourseDurationFromLessons, getNumberOfStudentsCourse, getTimesCompletedCourse } from '../../store';
import { selectAllCourses, selectCourseById } from '../../store/course';
import { useAppSelector } from './use-app-selector';

interface CourseId {
  courseId: number;
}

export const useCourses = () => {
  const courses = useAppSelector(selectAllCourses);
  const coursesDict = useAppSelector((state: RootState) => state.course.entities);
  const courseLessonIds = useAppSelector((state: RootState) => state.course.courseLessonIds);
  const selectedCourseId = useAppSelector((state: RootState) => state.course.selectedCourseId);
  const selectedCourse = useAppSelector((state: RootState) => selectedCourseId !== null ? selectCourseById(state, selectedCourseId): undefined);

  const courseLessons = useAppSelector((state: RootState) => state.student.studentCourses[selectedCourseId ?? 0]);

  return {
    courseLessonIds,
    courseLessons,
    courses,
    coursesDict,
    selectedCourse,
    selectedCourseId,
  };
}

export const useCourse = ({ courseId }: CourseId) => {
  const attendances = useAppSelector((state: RootState) => getNumberOfStudentsCourse(state, courseId));
  const completions = useAppSelector((state: RootState) => getTimesCompletedCourse(state, courseId));
  const duration = useAppSelector((state: RootState) => getCourseDurationFromLessons(state, courseId));

  return {
    attendances,
    completions,
    duration,
  };
}