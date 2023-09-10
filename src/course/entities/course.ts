import { Lesson } from "./lesson";

export interface Course {
  id: number;
  lessons: Lesson[];
  name: string;
  numberOfStudents: number;
  objectives: string;
}