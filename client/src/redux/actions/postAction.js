import { ALERT, POST } from "../types";
import {
  postDataAPI,
  getDataAPI,
  deleteDataAPI,
  putDataAPI,
} from "../../utils/fetchData";

export const getAllPosts =
  ({ auth }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await getDataAPI(`posts`, auth.token);
      dispatch({
        type: POST.GET_POSTS,
        payload: res.data.allPost,
      });
      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err) {
      dispatch({
        type: ALERT,
        payload: {
          error: err.response.message,
        },
      });
    }
  };

export const getPostById =
  ({ id, auth }) =>
  async (dispatch) => {
    try {
      const res = await getDataAPI(`posts/${id}`, auth.token);
      console.log(res);
      dispatch({
        type: POST.GET_POST,
        payload: res.data.post,
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

export const createPost =
  ({ data, auth }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await postDataAPI(`posts`, data, auth.token);
      dispatch({
        type: POST.CREATE_POST,
        payload: res.data.post,
      });
      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err) {
      dispatch({
        type: ALERT,
        payload: {
          error: err.response.data.message,
        },
      });
    }
  };

export const deletePostById =
  ({ id, auth }) =>
  async (dispatch) => {
    try {
      const res = await deleteDataAPI(`posts/${id}`, auth.token);
      console.log(res);
      dispatch({
        type: POST.DELETE_POST,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: ALERT,
        payload: { error: err.response.data.message },
      });
    }
  };

export const editPostById =
  ({ id, data, auth }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await putDataAPI(`posts/${id}`, data, auth.token);
      dispatch({
        type: POST.EDIT_POST,
        payload: res.data.editedQuiz,
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
