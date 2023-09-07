export const studentReducer = ( state = {}, action: {
  type: string,
  payload: string,
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