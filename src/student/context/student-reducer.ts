import { Student } from '../entities';

export const studentReducer = ( state = {}, action: {
  type: string,
  payload: Student,
} ) => {

  switch (action.type) {
    case 'Student/Select Student':
      return {
        ...state,
        selectedStudent: action.payload,
      };

    default:
      return state;
  }
}