import { combineReducers } from "redux";
import alertReducer from "./alertReducer";
import authReducer from "./authReducer";
import flashcardReducer from "./flashcardReducer";
import historyReducer from "./historyReducer";
import quizReducer from "./quizReducer";

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  quiz: quizReducer,
  flashcard: flashcardReducer,
  history: historyReducer,
});
