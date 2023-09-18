import { Lesson } from './lesson';

export class Course {
  activeLesson?: Lesson;
  completed: boolean;
  completedLessons: Lesson[];
  courseLessons: Lesson[];
  duration: number;
  id: number;
  name: string;
  numberOfStudents: number;
  objectives: string;
  sinceDate: string;

  constructor(name: string, objectives: string, lessons?: Lesson[]) {
    this.activeLesson = lessons?.[0];
    this.completed = false;
    this.completedLessons = [];
    this.courseLessons = [];
    this.id = new Date().getTime();
    this.name = name;
    this.numberOfStudents = 0;
    this.objectives = objectives;
    this.sinceDate = new Date().toISOString();
    this.duration = this.courseLessons.reduce((acc, curr) => acc + Number(curr.duration), 0);
  }
}