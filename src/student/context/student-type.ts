export interface StudentContextType {
  selectedStudent: string;
  selectStudent: (studentId: string) => void;
}