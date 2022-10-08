import { ALERT, FLASHCARD } from "../types";
import {
    postDataAPI,
    getDataAPI,
    deleteDataAPI,
    putDataAPI,
} from "../../utils/fetchData";

export const createFlashcard =
    ({ data, auth }) =>
    async (dispatch) => {
        console.log("data ??", data);
        try {
            dispatch({ type: ALERT, payload: { loading: true } });
            const res = await postDataAPI("flashcards", data, auth.token);
            dispatch({
                type: FLASHCARD.CREATE_FLASHCARD,
                payload: res.data.Cards,
            });
            dispatch({
                type: ALERT,
                payload: {
                    success: res.message,
                },
            });
            window.location.href = "/mylibrary";
        } catch (err) {
            dispatch({
                type: ALERT,
                payload: {
                    error: err.response.data.message,
                },
            });
        }
    };

export const getAllFlashcard =
    ({ auth }) =>
    async (dispatch) => {
        try {
            dispatch({ type: ALERT, payload: { loading: true } });
            const res = await getDataAPI(`flashcards/`, auth.token);

            dispatch({
                type: FLASHCARD.GET_FLASHCARD,
                payload: res.data.flashcard,
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

export const getFlashcardsByUserId =
    ({ auth }) =>
    async (dispatch) => {
        try {
            dispatch({ type: ALERT, payload: { loading: true } });
            const res = await getDataAPI(
                `flashcards/user/${auth.user._id}`,
                auth.token
            );

            dispatch({
                type: FLASHCARD.GET_FLASHCARDS,
                payload: res.data.flashcards,
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

export const getFlashcardById =
    ({ id, auth }) =>
    async (dispatch) => {
        try {
            dispatch({ type: ALERT, payload: { loading: true } });
            const res = await getDataAPI(`flashcards/${id}`, auth.token);

            dispatch({
                type: FLASHCARD.GET_FLASHCARD,
                payload: res.data.flashcard,
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

export const deleteFlashcardById =
    ({ id, auth }) =>
    async (dispatch) => {
        try {
            const res = await deleteDataAPI(`flashcards/${id}`, auth.token);
            dispatch({
                type: FLASHCARD.DELETE_FLASHCARD,
                payload: id,
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

export const updateFlashcard =
    ({ id, data, auth }) =>
    async (dispatch) => {
        try {
            dispatch({ type: ALERT, payload: { loading: true } });
            const res = await putDataAPI(`flashcards/${id}`, data, auth.token);
            dispatch({
                type: FLASHCARD.UPDATE_FLASHCARD,
                payload: res.data.newFlashcard,
            });

            dispatch({
                type: ALERT,
                payload: {
                    success: res.message,
                },
            });
            window.location.href = "/mylibrary";
        } catch (err) {
            dispatch({
                type: ALERT,
                payload: {
                    error: err.response.data.message,
                },
            });
        }
    };
