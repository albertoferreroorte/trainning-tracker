import { Course, Lesson } from '../../course';
import { Student } from '../entities';

export interface StudentContextType {
  courses: Course[];
  lessons: Lesson[];
  selectedLessonIds: number[];
  selectedStudent: Student | undefined;
  selectedStudentCourseId: number;
  students: Student[];
}