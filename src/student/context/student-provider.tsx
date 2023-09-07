import { ReactNode, useReducer } from 'react';
import { Student } from '../entities';
import { StudentContext } from './student-context';
import { studentReducer } from './student-reducer';
import { StudentContextType } from './student-type';

const init = () => {
  return {
    selectedStudent: {},
  }
}

export const StudentProvider: React.FC<{ children?: ReactNode }> = ({ children }) => {

  const [ studentState, dispatch ] = useReducer(studentReducer, {}, init);

  const selectStudent = ( student = {} as Student ) => {
    const action = {
      type: 'Student/Select Student',
      payload: student,
    };
    dispatch(action);
  }

  return (
    <StudentContext.Provider value={{
      ...studentState,
      selectStudent,
    } as StudentContextType}>
      { children }
    </StudentContext.Provider>
  )
};