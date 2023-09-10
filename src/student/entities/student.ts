import { Course } from "../../course";

export class Student {
  courses: Course[];
  fullName: string;
  id: string;
  jobPosition: string;

  constructor(courses: Course[], fullName: string, jobPosition: string) {
    this.courses = courses;
    this.fullName = fullName;
    this.id = new Date().getTime().toLocaleString();
    this.jobPosition = jobPosition;
  }

  toObject() {
    return {
      courses: this.courses,
      fullName: this.fullName,
      id: this.id,
      jobPosition: this.jobPosition,
    };
  }
}