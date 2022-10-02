import { AUTH, ALERT } from "../types";
import { postDataAPI } from "../../utils/fetchData";

export const login = (data) => async (dispatch) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } });
    const res = await postDataAPI("login", data);
    dispatch({
      type: AUTH,
      payload: {
        token: res.data.access_token,
        user: res.data.user,
      },
    });

    localStorage.setItem("loggedIn", true);
    dispatch({
      type: ALERT,
      payload: {
        success: res.data.msg,
      },
    });
  } catch (err) {
    dispatch({
      type: ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};

export const refreshToken = () => async (dispatch) => {
  const loggedIn = localStorage.getItem("loggedIn");
  if (loggedIn) {
    dispatch({ type: ALERT, payload: { loading: true } });

    try {
      const res = await postDataAPI("refresh_token");
      dispatch({
        type: AUTH,
        payload: {
          token: res.data.access_token,
          user: res.data.user,
        },
      });

      dispatch({ type: ALERT, payload: {} });
    } catch (err) {
      dispatch({
        type: ALERT,
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  }
};

export const register = (data) => async (dispatch) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } });

    const res = await postDataAPI("register", data);
    dispatch({
      type: AUTH,
      payload: {
        token: res.data.access_token,
        user: res.data.user,
      },
    });

    localStorage.setItem("loggedIn", true);
    dispatch({
      type: ALERT,
      payload: {
        success: res.data.msg,
      },
    });
  } catch (err) {
    dispatch({
      type: ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem("loggedIn");
    await postDataAPI("logout");
    window.location.href = "/";
  } catch (err) {
    dispatch({
      type: ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};
