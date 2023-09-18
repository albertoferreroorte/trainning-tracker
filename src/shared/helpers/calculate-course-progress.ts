import { Lesson } from '../../course';

export const calculateCourseProgress = (lessons: Lesson[], completedLessons: Lesson[]): number => {
  if (lessons?.length === 0 || completedLessons.length === 0) {
    return 0;
  }

  const totalDuration = lessons?.reduce(
    (acc, lesson) => acc + parseFloat(lesson.duration),
    0
  );

  const totalCompletedDuration = completedLessons.reduce(
    (acc, lesson) => acc + parseFloat(lesson.duration),
    0
  );

  if (totalDuration === 0) {
    return 0;
  }

  return (totalCompletedDuration / totalDuration) * 100;
}