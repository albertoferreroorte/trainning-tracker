import { createEntityAdapter, createSlice, EntityState } from '@reduxjs/toolkit';
import { Student } from '../../student/entities';
import { RootState } from '../store';

type StudentCourses = {
  [studentId: string]: {
    [courseId: string]: number[];
  };
};

interface StudentState extends EntityState<Student> {
  selectedStudentId: number | null;
  selectedStudentCourseId: number | null,
  selectedStudentLessonIds: number[],
  studentCourses: StudentCourses;
  studentCourseLessons: number[];
}

export const studentsAdapter = createEntityAdapter<Student>();

const initialState: StudentState = studentsAdapter.getInitialState({
  selectedStudentId: null,
  selectedStudentCourseId: null,
  selectedStudentLessonIds: [],
  studentCourses: {},
  studentCourseLessons: [],
});

export const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    addStudent: studentsAdapter.addOne,
    deleteStudent: studentsAdapter.removeOne,
    selectStudentId: (state, action) => {
      state.selectedStudentId = action.payload;
      state.selectedStudentCourseId = null;
      state.selectedStudentLessonIds = [];
    },
    selectStudentCourse: (state, action) => {
      state.selectedStudentCourseId = action.payload;
    },       
    selectStudentLessons: (state, action) => {
      state.selectedStudentLessonIds = action.payload;
    },
    setStudentCourseCompletedLessons: (state, action) => {
      const { studentId, courseId, lessonsIds } = action.payload;
      if (!state.entities[studentId]) {
        state.entities[studentId] = {
          completedLessons: [],
          courseIds: [],
          id: studentId,
          fullName: '',
          jobPosition: '',
          sinceDate: 0,
          studentCourses: {}
        };
      }
      state.entities[studentId]!.studentCourses[courseId] = lessonsIds;
    },
    setStudentCourseLessons: (state, action) => {
      state.studentCourseLessons = action.payload;
    },
    updateStudent: studentsAdapter.updateOne,
  },
});

export const {
  addStudent,
  deleteStudent,
  selectStudentId,
  selectStudentCourse,
  selectStudentLessons,
  setStudentCourseCompletedLessons,
  setStudentCourseLessons,
  updateStudent,
} = studentSlice.actions;

export const {
  selectAll: selectAllStudents,
  selectById: selectStudentById,
  selectIds: selectStudentIds,
  selectEntities: selectStudents,
} = studentsAdapter.getSelectors((state: RootState) => state.student);
