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
      selectStudent: (state, action) => {
        state.selected = action.payload;
      }
    }
});

export const {
  addNewEmptyStudent,
  selectStudent,
} = studentSlice.actions;