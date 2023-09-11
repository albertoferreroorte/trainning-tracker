import { createSlice } from '@reduxjs/toolkit';
import { Student } from '../../student/entities';

interface StudentState {
  students: Student[];
  selected: Student | null;
}

const initialState: StudentState = {
  students: [],
  selected: null,
};

export const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
      addCourse: (state, action) => {
        state.selected?.courses?.push(action.payload);
      },
      addNewEmptyStudent: (state, action) => {
        state.students.push(action.payload);
      },
      deleteStudentById: (state, action) => {
        state.selected = null;
        state.students = state.students.filter(
          student => student.id !== action.payload,
        );
      },
      setStudents: (state, action) => {
        state.students = action.payload;
      },
      updateStudent: (state, action) => {
        state.students = state.students.map(student => {
          if (student.id === action.payload.id) {
            return action.payload;
          }
          return student;
        });
      },
      selectStudent: (state, action) => {
        state.selected = action.payload;
      }
    }
});

export const {
  addCourse,
  addNewEmptyStudent,
  deleteStudentById,
  selectStudent,
  setStudents,
  updateStudent,
} = studentSlice.actions;