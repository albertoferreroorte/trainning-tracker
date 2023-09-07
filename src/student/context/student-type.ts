import { Student } from '../entities';

export interface StudentContextType {
  selectedStudent: Student;
  selectStudent: (student: Student) => void;
}