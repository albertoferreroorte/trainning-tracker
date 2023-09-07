import { createContext } from 'react';
import { StudentContextType } from './student-type';

export const StudentContext = createContext<StudentContextType | undefined>(undefined);
