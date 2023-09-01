export class Student {
  id: string;
  fullName: string;
  jobPosition: string;

  constructor(fullName: string, jobPosition: string) {
    this.fullName = fullName;
    this.jobPosition = jobPosition;
    this.id = new Date().toISOString();
  }
}