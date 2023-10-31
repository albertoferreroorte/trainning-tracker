export class Course {
  completedLessonIds: number[];
  courseLessonIds: number[];
  duration: number;
  id: number;
  name: string;
  numberOfStudents: number;
  objectives: string;
  progress: number;
  sinceDate: string;

  constructor(name: string, objectives: string) {
    this.completedLessonIds = [];
    this.courseLessonIds = [];
    this.id = new Date().getTime();
    this.name = name;
    this.numberOfStudents = 0;
    this.objectives = objectives;
    this.progress = 0;
    this.sinceDate = new Date().toISOString();
    this.duration = 0;
  }
}