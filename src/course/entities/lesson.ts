export class Lesson {
  duration: number;
  id: number;
  title: string;

  constructor(duration: number, title: string) {
    this.duration = duration || 0;
    this.id = new Date().getTime();
    this.title = title || '';
  }
}