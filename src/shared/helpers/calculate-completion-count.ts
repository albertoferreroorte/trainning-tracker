import { Course } from '../../course';

export const calculateCompletionCount = (course: Course) => {
  const completedLessonCount = course.completedLessons.length;
  return completedLessonCount;
}
