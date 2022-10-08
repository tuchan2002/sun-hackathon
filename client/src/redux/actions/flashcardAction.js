import { ALERT, FLASHCARD } from "../types";
import { postDataAPI, getDataAPI, deleteDataAPI } from "../../utils/fetchData";

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
