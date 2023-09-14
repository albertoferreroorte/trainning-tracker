import { Lesson } from './lesson';

export interface Course {
  activeLesson: Lesson;
  completed: boolean;
  completedLessons: Lesson[];
  id: number;
  lessons: Lesson[];
  name: string;
  numberOfStudents: number;
  objectives: string;
  sinceDate: string;
}