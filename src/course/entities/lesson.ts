export class Lesson {
  duration: string;
  id: number;
  title: string;

  constructor(duration: string, title: string) {
    this.duration = duration || '0';
    this.id = new Date().getTime();
    this.title = title || '';
  }
}