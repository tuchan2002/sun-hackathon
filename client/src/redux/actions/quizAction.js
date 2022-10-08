import { ALERT, QUIZ } from "../types";
import {
  postDataAPI,
  getDataAPI,
  deleteDataAPI,
  putDataAPI,
} from "../../utils/fetchData";

export const createQuiz =
  ({ data, auth }) =>
  async (dispatch) => {
    console.log("data ??", data);
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await postDataAPI("quizzes", data, auth.token);
      dispatch({
        type: QUIZ.CREATE_QUIZ,
        payload: res.data.quizSaved,
      });

      dispatch({
        type: ALERT,
        payload: {
          success: res.message,
        },
      });
      window.location.href = "/my_library";
    } catch (err) {
      dispatch({
        type: ALERT,
        payload: {
          error: err.response.data.message,
        },
      });
    }
  };

export const getQuizById =
  ({ id, auth }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await getDataAPI(`quizzes/${id}`, auth.token);

      dispatch({
        type: QUIZ.GET_QUIZ,
        payload: res.data.quiz,
      });

      dispatch({
        type: ALERT,
        payload: {
          success: res.message,
        },
      });
    } catch (err) {
      dispatch({
        type: ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const deleteQuizById =
  ({ id, auth }) =>
  async (dispatch) => {
    try {
      const res = await deleteDataAPI(`quizzes/${id}`, auth.token);
      dispatch({
        type: QUIZ.DELETE_QUIZ,
        payload: id,
      });

      window.location.href = "/my_library";
    } catch (err) {
      dispatch({
        type: ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const updateQuiz =
  ({ id, data, auth }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await putDataAPI(`quizzes/${id}`, data, auth.token);
      dispatch({
        type: QUIZ.UPDATE_QUIZ,
        payload: res.data.editedQuiz,
      });

      dispatch({
        type: ALERT,
        payload: {
          success: res.message,
        },
      });
      window.location.href = "/my_library";
    } catch (err) {
      dispatch({
        type: ALERT,
        payload: {
          error: err.response.data.message,
        },
      });
    }
  };
