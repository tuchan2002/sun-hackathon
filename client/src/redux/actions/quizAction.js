import { ALERT, QUIZ } from "../types";
import { postDataAPI, getDataAPI } from "../../utils/fetchData";

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
      const res = await getDataAPI(`/quizzes/${id}`, auth.token);

      dispatch({
        type: QUIZ.GET_QUIZ,
        payload: { ...res.data, page: 2 },
      });
    } catch (err) {
      dispatch({
        type: ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };
