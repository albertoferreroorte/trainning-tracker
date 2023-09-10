export class Student {
  fullName: string;
  id: string;
  jobPosition: string;

  constructor(fullName: string, jobPosition: string) {
    this.fullName = fullName;
    this.id = new Date().getTime().toLocaleString();
    this.jobPosition = jobPosition;
  }

  toObject() {
    return {
      fullName: this.fullName,
      id: this.id,
      jobPosition: this.jobPosition,
    };
  }
}