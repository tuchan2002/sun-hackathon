import { AUTH, ALERT } from "../types";
import { postDataAPI } from "../../utils/fetchData";
import { validateRegister, validateSetNewPassword } from "../../utils/validate";

export const login = (data) => async (dispatch) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } });
    const res = await postDataAPI("auth/login", data);
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

export const refreshToken = () => async (dispatch) => {
  const loggedIn = localStorage.getItem("loggedIn");
  if (loggedIn) {
    dispatch({ type: ALERT, payload: { loading: true } });

    try {
      const res = await postDataAPI("auth/refresh_token");
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
          error: err.response.data.message,
        },
      });
    }
  }
};

export const register = (data) => async (dispatch) => {
  const isCheck = validateRegister(data);
  if (isCheck.errLength > 0) {
    return dispatch({ type: ALERT, payload: isCheck.errMsg });
  }
  try {
    dispatch({ type: ALERT, payload: { loading: true } });

    const res = await postDataAPI("auth/register", data);
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

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem("loggedIn");
    await postDataAPI("auth/logout");
    window.location.href = "/";
  } catch (err) {
    dispatch({
      type: ALERT,
      payload: {
        error: err.response.data.message,
      },
    });
  }
};

export const sendMailResetPassword = (data) => async (dispatch) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } });
    const res = await postDataAPI("auth/reset_password", data);
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

export const setNewPassword = (data) => async (dispatch) => {
  const isCheck = validateSetNewPassword(data);
  if (isCheck.errLength > 0) {
    return dispatch({ type: ALERT, payload: isCheck.errMsg });
  }
  try {
    dispatch({ type: ALERT, payload: { loading: true } });
    const res = await postDataAPI("auth/new_password", data);
    dispatch({
      type: ALERT,
      payload: {
        success: res.message,
      },
    });
    window.location.href = "/";
  } catch (err) {
    dispatch({
      type: ALERT,
      payload: {
        error: err.response.data.message,
      },
    });
  }
};
