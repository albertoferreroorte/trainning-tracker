export class Student {
  fullName: string;
  id: string;
  jobPosition: string;

  constructor(fullName: string, jobPosition: string) {
    this.fullName = fullName;
    this.id = new Date().toISOString();
    this.jobPosition = jobPosition;
  }
}