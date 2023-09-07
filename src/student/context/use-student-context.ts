import { useContext } from 'react';
import { StudentContext } from './student-context';

export const useStudentContext = () => {
  const context = useContext(StudentContext);
  if (context === undefined) {
    throw new Error('useStudentContext must be used within a StudentContext.Provider');
  }
  return context;
}