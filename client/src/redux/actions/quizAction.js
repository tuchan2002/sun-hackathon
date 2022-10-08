import { ALERT, QUIZ } from "../types";
import { postDataAPI } from "../../utils/fetchData";

export const createQuiz =
  ({ data, auth }) =>
  async (dispatch) => {
    console.log("data ??", data);
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await postDataAPI("quiz", data, auth.token);
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
    } catch (err) {
      dispatch({
        type: ALERT,
        payload: {
          error: err.response.data.message,
        },
      });
    }
  };
