import { HISTORY, ALERT } from "../types";
import { postDataAPI, getDataAPI } from "../../utils/fetchData";

export const createHistory =
  ({ data, auth }) =>
  async (dispatch) => {
    console.log("data ??", data);
    try {
      const res = await postDataAPI("users/hisroty", data, auth.token);
      console.log("dmmm");
    } catch (err) {
      dispatch({
        type: ALERT,
        payload: {
          error: err.response.data.message,
        },
      });
    }
  };

export const getAllHistory = (auth) => async (dispatch) => {
  try {
    console.log("OKsadK", 1);

    const res = await getDataAPI(`users/hisroty`, auth.token);
    console.log("OKOKOK", res.data);

    dispatch({
      type: HISTORY.GET_ALL_HISTORY,
      payload: res.data.activities,
    });
  } catch (err) {
    dispatch({
      type: ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};
