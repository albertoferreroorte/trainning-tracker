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
      addNewEmptyStudent: (state, action) => {
        state.students.push(action.payload);
      },
      deleteStudentById: (state, action) => {
        state.selected = null;
        state.students = state.students.filter(
          student => student.id !== action.payload,
        );
      },
      selectStudent: (state, action) => {
        state.selected = action.payload;
      }
    }
});

export const {
  addNewEmptyStudent,
  selectStudent,
} = studentSlice.actions;