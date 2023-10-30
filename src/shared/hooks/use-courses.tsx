import { selectAllCourses, selectCourseById } from '../../store/course';
import { useAppSelector } from './use-app-selector';

export const useCourses = () => {
  const courses = useAppSelector(selectAllCourses);
  const courseLessonIds = useAppSelector(state => state.course.courseLessonIds);
  const selectedCourseId = useAppSelector(state => state.course.selectedCourseId);
  const selectedCourse = useAppSelector(state => selectedCourseId !== null ? selectCourseById(state, selectedCourseId): undefined);
  const courseLessons = useAppSelector(state => state.student.studentCourses[selectedCourseId ?? 0]);

  return { courses, courseLessonIds, courseLessons, selectedCourse, selectedCourseId };
}