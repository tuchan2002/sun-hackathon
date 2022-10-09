import { combineReducers } from "redux";
import alertReducer from "./alertReducer";
import authReducer from "./authReducer";
import flashcardReducer from "./flashcardReducer";
import historyReducer from "./historyReducer";
import postReducer from "./postReducer";
import quizReducer from "./quizReducer";
import socketReducer from "./socketReducer";

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  quiz: quizReducer,
  flashcard: flashcardReducer,
  history: historyReducer,
  socket: socketReducer,
  post: postReducer,
});
