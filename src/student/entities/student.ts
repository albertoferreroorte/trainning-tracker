import { Course } from '../../course';

export class Student {
  courses?: Course[] | null;
  fullName: string;
  id: number;
  jobPosition: string;
  sinceDate: string;

  constructor(fullName: string, jobPosition: string, courses?: Course[]) {
    this.courses = courses;
    this.fullName = fullName;
    this.id = new Date().getTime();
    this.jobPosition = jobPosition;
    this.sinceDate = new Date().toISOString();
  }

}