import { selectLessons } from '../../store';
import { useAppSelector } from './use-app-selector';

export const useLessons = (courseId: number) => {
  
  const lessonsSelector = selectLessons(courseId);
  const lessons = useAppSelector(state => lessonsSelector(state));

  return {
    lessons,
  };
};

