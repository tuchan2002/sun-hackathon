import { QUIZ } from "../types";

const initialState = {
  loading: false,
  quizzes: [],
};

const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case QUIZ.CREATE_QUIZ:
      return {
        ...state,
        quizzes: [action.payload, ...state.quizzes],
      };
    default:
      return state;
  }
};

export default quizReducer;
