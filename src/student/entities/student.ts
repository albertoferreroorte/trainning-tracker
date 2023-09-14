import { Course } from '../../course';

export class Student {
  courses?: Course[] | null;
  fullName: string;
  id: string;
  jobPosition: string;
  sinceDate: string;

  constructor(fullName: string, jobPosition: string, courses?: Course[]) {
    this.courses = courses;
    this.fullName = fullName;
    this.id = new Date().getTime().toLocaleString();
    this.jobPosition = jobPosition;
    this.sinceDate = new Date().toISOString();
  }

  toObject() {
    return {
      courses: this.courses,
      fullName: this.fullName,
      id: this.id,
      jobPosition: this.jobPosition,
      sinceDate: this.sinceDate,
    };
  }
}