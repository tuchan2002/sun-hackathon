import { QUIZ } from "../types";

const initialState = {
  loading: false,
  quiz: {},
  quizzes: [],
};

const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case QUIZ.CREATE_QUIZ:
      return {
        ...state,
        quizzes: [action.payload, ...state.quizzes],
      };
    case QUIZ.GET_QUIZ:
      return {
        ...state,
        quiz: action.payload,
      };
    case QUIZ.DELETE_QUIZ:
      return {
        ...state,
        quizzes: state.quizzes.filter((item) => item._id !== action.payload),
      };
    default:
      return state;
  }
};

export default quizReducer;
