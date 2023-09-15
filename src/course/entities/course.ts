import { Lesson } from './lesson';

export class Course {
  activeLesson?: Lesson;
  completed: boolean;
  completedLessons: Lesson[];
  id: number;
  lessons: Lesson[];
  name: string;
  numberOfStudents: number;
  objectives: string;
  sinceDate: string;

  constructor(name: string, objectives: string, lessons?: Lesson[]) {
    this.activeLesson = lessons?.[0];
    this.completed = false;
    this.completedLessons = [];
    this.id = new Date().getTime();
    this.lessons = lessons || [];
    this.name = name;
    this.numberOfStudents = 0;
    this.objectives = objectives;
    this.sinceDate = new Date().toISOString();
  }
}