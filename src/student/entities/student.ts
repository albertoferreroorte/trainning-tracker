export class Student {
  completedLessons: {
    [courseId: number]: number[];
  };
  courseIds: number[];
  fullName: string;
  id: number;
  jobPosition: string;
  sinceDate: number;
  studentCourses: StudentCourses;

  constructor(fullName: string, jobPosition: string, courseIds: number[] = [], studentCourses: StudentCourses = {}) {
    this.completedLessons = [];
    this.courseIds = courseIds;
    this.fullName = fullName || '';
    this.id = new Date().getTime();
    this.jobPosition = jobPosition || '';
    this.sinceDate = new Date().getTime();
    this.studentCourses = studentCourses;
  }

}

export interface StudentCourses {
  [courseId: number]: number[];
}